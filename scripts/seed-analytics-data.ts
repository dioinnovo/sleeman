/**
 * Comprehensive Seed Script for Ship Sticks Analytics Tables
 * Populates all empty analytics tables with realistic, interconnected data
 *
 * Run with: npx ts-node scripts/seed-analytics-data.ts
 */

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/shipsticks'
});

// Helper to execute queries
async function query(sql: string, params: any[] = []) {
  try {
    const result = await pool.query(sql, params);
    return result.rows;
  } catch (error: any) {
    console.error('Query error:', error.message);
    throw error;
  }
}

// Seed tracking_events (30K+ records - 3-5 events per shipment)
async function seedTrackingEvents() {
  console.log('\n📦 Seeding tracking_events...');

  const shipments = await query('SELECT shipment_id, carrier, origin_city, origin_state, destination_city, destination_state, scheduled_pickup_date, actual_pickup_date, scheduled_delivery_date, actual_delivery_date FROM shipments ORDER BY shipment_id');

  const eventTypes = ['pickup_scheduled', 'picked_up', 'in_transit', 'arrived_at_hub', 'out_for_delivery', 'delivered', 'delayed'];
  const weatherConditions = ['clear', 'rain', 'snow', 'fog', 'storm', null, null, null]; // Most shipments have no weather issues

  let events = [];

  for (const shipment of shipments) {
    const pickupDate = shipment.actual_pickup_date || shipment.scheduled_pickup_date;
    const deliveryDate = shipment.actual_delivery_date || shipment.scheduled_delivery_date;

    if (!pickupDate || !deliveryDate) continue;

    const startTime = new Date(pickupDate).getTime();
    const endTime = new Date(deliveryDate).getTime();
    const totalDuration = endTime - startTime;

    // Generate 3-5 events per shipment
    const numEvents = 3 + Math.floor(Math.random() * 3);

    for (let i = 0; i < numEvents; i++) {
      const progress = i / (numEvents - 1); // 0 to 1
      const eventTimestamp = new Date(startTime + (totalDuration * progress));

      let eventType = eventTypes[i] || eventTypes[eventTypes.length - 1];
      let delayMinutes = 0;
      let weather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];

      // 18% of shipments have delays
      if (Math.random() < 0.18 && i > 1) {
        eventType = 'delayed';
        delayMinutes = 120 + Math.floor(Math.random() * 1200); // 2-22 hour delays
        weather = ['rain', 'snow', 'storm'][Math.floor(Math.random() * 3)];
      }

      // Determine location
      const isInTransit = progress > 0.1 && progress < 0.9;
      const location = isInTransit
        ? { city: 'In Transit', state: '' }
        : progress < 0.5
          ? { city: shipment.origin_city, state: shipment.origin_state }
          : { city: shipment.destination_city, state: shipment.destination_state };

      events.push([
        shipment.shipment_id,
        eventType,
        eventTimestamp.toISOString(),
        location.city,
        location.state,
        shipment.carrier,
        delayMinutes,
        weather
      ]);
    }

    // Batch insert every 1000 events
    if (events.length >= 1000) {
      await insertTrackingEventsBatch(events);
      events = [];
    }
  }

  // Insert remaining events
  if (events.length > 0) {
    await insertTrackingEventsBatch(events);
  }

  const count = await query('SELECT COUNT(*) as count FROM tracking_events');
  console.log(`✅ Created ${count[0].count} tracking events`);
}

async function insertTrackingEventsBatch(events: any[][]) {
  const values = events.map((e, i) =>
    `($${i*8+1}, $${i*8+2}, $${i*8+3}, $${i*8+4}, $${i*8+5}, $${i*8+6}, $${i*8+7}, $${i*8+8})`
  ).join(',');

  const params = events.flat();

  await query(`
    INSERT INTO tracking_events (shipment_id, event_type, event_timestamp, location_city, location_state, carrier, delay_minutes, weather_condition)
    VALUES ${values}
  `, params);
}

// Seed insurance_claims (300-500 records - 3-5% of shipments)
async function seedInsuranceClaims() {
  console.log('\n🛡️  Seeding insurance_claims...');

  const shipments = await query(`
    SELECT s.shipment_id, s.customer_id, s.equipment_value, s.insurance_coverage, s.actual_delivery_date, s.carrier
    FROM shipments s
    WHERE s.actual_delivery_date IS NOT NULL
    AND s.equipment_value > 2000
    ORDER BY RANDOM()
    LIMIT 450
  `);

  const damageTypes = ['scratched', 'dented', 'broken', 'lost', 'water_damage', 'crushed'];
  const statuses = ['filed', 'under_review', 'approved', 'denied', 'paid'];

  let claimIdCounter = 1;

  for (const shipment of shipments) {
    const claimAmount = 100 + (Math.random() * Math.min(shipment.equipment_value * 0.8, 2000));
    const damageType = damageTypes[Math.floor(Math.random() * damageTypes.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    const filedAt = new Date(shipment.actual_delivery_date);
    filedAt.setHours(filedAt.getHours() + (24 + Math.random() * 48)); // Filed 1-3 days after delivery

    let resolvedAt = null;
    let approvedAmount = null;

    if (status === 'approved' || status === 'paid') {
      approvedAmount = claimAmount * (0.85 + Math.random() * 0.1); // 85-95% of claim
      resolvedAt = new Date(filedAt);
      resolvedAt.setDate(resolvedAt.getDate() + (7 + Math.floor(Math.random() * 14))); // 7-21 days to resolve
    } else if (status === 'denied') {
      resolvedAt = new Date(filedAt);
      resolvedAt.setDate(resolvedAt.getDate() + (5 + Math.floor(Math.random() * 10)));
    }

    await query(`
      INSERT INTO insurance_claims (claim_id, shipment_id, customer_id, claim_amount, claim_type, claim_status, claim_date, resolution_date, payout_amount, days_to_resolution)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `, [
      claimIdCounter++,
      shipment.shipment_id,
      shipment.customer_id,
      claimAmount,
      damageType,
      status,
      filedAt.toISOString().split('T')[0],
      resolvedAt ? resolvedAt.toISOString().split('T')[0] : null,
      approvedAmount,
      resolvedAt ? Math.ceil((resolvedAt.getTime() - filedAt.getTime()) / (1000 * 60 * 60 * 24)) : null
    ]);
  }

  const count = await query('SELECT COUNT(*) as count FROM insurance_claims');
  console.log(`✅ Created ${count[0].count} insurance claims`);
}

// Seed customer_service_tickets (800-1,200 records)
async function seedCustomerServiceTickets() {
  console.log('\n🎫 Seeding customer_service_tickets...');

  const shipments = await query(`
    SELECT s.shipment_id, s.customer_id, s.created_at, s.actual_delivery_date, s.status
    FROM shipments s
    ORDER BY RANDOM()
    LIMIT 1000
  `);

  const ticketTypes = [
    { type: 'tracking_inquiry', priority: 'medium', avgResolution: 6 },
    { type: 'damage_claim', priority: 'high', avgResolution: 72 },
    { type: 'pricing_question', priority: 'low', avgResolution: 4 },
    { type: 'delivery_issue', priority: 'high', avgResolution: 24 },
    { type: 'general_inquiry', priority: 'low', avgResolution: 8 }
  ];

  for (const shipment of shipments) {
    const ticketTemplate = ticketTypes[Math.floor(Math.random() * ticketTypes.length)];

    const createdAt = new Date(shipment.created_at);
    createdAt.setHours(createdAt.getHours() + Math.random() * 72);

    // 70% meet SLA, 30% miss
    const meetsSLA = Math.random() < 0.7;
    const resolutionHours = meetsSLA
      ? ticketTemplate.avgResolution * (0.5 + Math.random() * 0.8)
      : ticketTemplate.avgResolution * (1.5 + Math.random() * 2);

    const resolvedAt = new Date(createdAt);
    resolvedAt.setHours(resolvedAt.getHours() + resolutionHours);

    const satisfactionScore = meetsSLA
      ? 4 + Math.floor(Math.random() * 2) // 4-5
      : 2 + Math.floor(Math.random() * 3); // 2-4

    await query(`
      INSERT INTO customer_service_tickets (customer_id, shipment_id, ticket_type, priority, subject, status, resolution_time_hours, satisfaction_score, created_at, resolved_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `, [
      shipment.customer_id,
      shipment.shipment_id,
      ticketTemplate.type,
      ticketTemplate.priority,
      `${ticketTemplate.type.replace('_', ' ')} for shipment`,
      'resolved',
      resolutionHours,
      satisfactionScore,
      createdAt,
      resolvedAt
    ]);
  }

  const count = await query('SELECT COUNT(*) as count FROM customer_service_tickets');
  console.log(`✅ Created ${count[0].count} customer service tickets`);
}

// Seed customer_sessions (8K-12K records)
async function seedCustomerSessions() {
  console.log('\n🖱️  Seeding customer_sessions...');

  const customers = await query('SELECT customer_id, customer_segment FROM customers');

  const sources = ['organic', 'google_ads', 'referral', 'direct', 'social', 'email'];

  for (const customer of customers) {
    // Each customer has 4-6 sessions on average
    const numSessions = 4 + Math.floor(Math.random() * 3);

    for (let i = 0; i < numSessions; i++) {
      const source = sources[Math.floor(Math.random() * sources.length)];
      const quotesGenerated = Math.floor(Math.random() * 4);

      // Conversion rates: Corporate 45%, Frequent 38%, Occasional 22%, New 15%
      let conversionRate = 0.22;
      if (customer.customer_segment === 'vip') conversionRate = 0.45;
      else if (customer.customer_segment === 'frequent') conversionRate = 0.38;
      else if (customer.customer_segment === 'new') conversionRate = 0.15;

      const bookingCompleted = Math.random() < conversionRate;
      const cartValue = bookingCompleted ? 150 + Math.random() * 300 : 0;
      const abandonmentStage = bookingCompleted ? null : ['quote', 'cart', 'checkout'][Math.floor(Math.random() * 3)];

      await query(`
        INSERT INTO customer_sessions (customer_id, session_date, source, quotes_generated, cart_value, booking_completed, abandonment_stage)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [
        customer.customer_id,
        new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000), // Last 180 days
        source,
        quotesGenerated,
        cartValue,
        bookingCompleted,
        abandonmentStage
      ]);
    }
  }

  const count = await query('SELECT COUNT(*) as count FROM customer_sessions');
  console.log(`✅ Created ${count[0].count} customer sessions`);
}

// Seed customer_lifetime_stats (2,000 records)
async function seedCustomerLifetimeStats() {
  console.log('\n📊 Seeding customer_lifetime_stats...');

  await query(`
    INSERT INTO customer_lifetime_stats (customer_id, first_shipment_date, last_shipment_date, total_shipments, total_revenue, avg_shipment_value, failed_deliveries, insurance_claims, is_churned, churn_date, predicted_ltv)
    SELECT
      c.customer_id,
      MIN(s.created_at)::date as first_shipment_date,
      MAX(s.created_at)::date as last_shipment_date,
      COUNT(s.shipment_id) as total_shipments,
      COALESCE(SUM(s.total_price), 0) as total_revenue,
      COALESCE(AVG(s.total_price), 0) as avg_shipment_value,
      COUNT(CASE WHEN s.actual_delivery_date > s.scheduled_delivery_date THEN 1 END) as failed_deliveries,
      (SELECT COUNT(*) FROM insurance_claims ic WHERE ic.customer_id = c.customer_id) as insurance_claims,
      CASE
        WHEN EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - MAX(s.created_at))) / 86400 > 180 THEN true
        ELSE false
      END as is_churned,
      CASE
        WHEN EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - MAX(s.created_at))) / 86400 > 180 THEN
          (MAX(s.created_at) + INTERVAL '180 days')::date
        ELSE NULL
      END as churn_date,
      COALESCE(c.lifetime_value * 1.15, SUM(s.total_price) * 1.15, 0) as predicted_ltv
    FROM customers c
    LEFT JOIN shipments s ON c.customer_id = s.customer_id
    GROUP BY c.customer_id, c.lifetime_value
  `);

  const count = await query('SELECT COUNT(*) as count FROM customer_lifetime_stats');
  console.log(`✅ Created ${count[0].count} customer lifetime stats`);
}

// Seed nps_surveys (2K-3K records - 30% response rate)
async function seedNpsSurveys() {
  console.log('\n⭐ Seeding nps_surveys...');

  const shipments = await query(`
    SELECT s.shipment_id, s.customer_id, s.service_level, s.actual_delivery_date, s.scheduled_delivery_date, c.customer_segment
    FROM shipments s
    JOIN customers c ON s.customer_id = c.customer_id
    WHERE s.actual_delivery_date IS NOT NULL
    ORDER BY RANDOM()
    LIMIT 2500
  `);

  for (const shipment of shipments) {
    const wasOnTime = shipment.actual_delivery_date <= shipment.scheduled_delivery_date;
    const isPremium = shipment.service_level === 'White Glove';

    // Premium on-time: NPS 72, Premium late: NPS 58
    // Standard on-time: NPS 48, Standard late: NPS 28
    let baseNPS = isPremium ? 72 : 48;
    if (!wasOnTime) baseNPS -= 20;

    const npsScore = Math.max(0, Math.min(10, baseNPS / 10 + (Math.random() * 2 - 1)));
    const likelihoodToRecommend = Math.max(0, Math.min(10, npsScore + (Math.random() * 2 - 1)));

    const comments = npsScore >= 9
      ? ['Excellent service!', 'Very satisfied', 'Will use again', null][Math.floor(Math.random() * 4)]
      : npsScore <= 6
        ? ['Delayed delivery', 'Poor communication', 'Damaged equipment', null][Math.floor(Math.random() * 4)]
        : null;

    const surveyDate = new Date(shipment.actual_delivery_date);
    surveyDate.setDate(surveyDate.getDate() + (3 + Math.floor(Math.random() * 7)));

    await query(`
      INSERT INTO nps_surveys (customer_id, shipment_id, nps_score, likelihood_to_recommend, service_rating, comments, survey_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [
      shipment.customer_id,
      shipment.shipment_id,
      Math.round(npsScore),
      Math.round(likelihoodToRecommend),
      Math.round(npsScore), // service_rating
      comments,
      surveyDate
    ]);
  }

  const count = await query('SELECT COUNT(*) as count FROM nps_surveys');
  console.log(`✅ Created ${count[0].count} NPS surveys`);
}

// Seed marketing_campaigns (25-30 campaigns)
async function seedMarketingCampaigns() {
  console.log('\n📢 Seeding marketing_campaigns...');

  const campaigns = [
    { name: 'Spring Golf Getaway Email', channel: 'email', spend: 15000, conversions: 85, revenue: 67500, roi: 450 },
    { name: 'Social Media Blast Q1', channel: 'social', spend: 25000, conversions: 45, revenue: 20000, roi: -20 },
    { name: 'SEO Content Marketing', channel: 'seo', spend: 8000, conversions: 125, revenue: 30400, roi: 380 },
    { name: 'PGA Partnership Promo', channel: 'partnership', spend: 12000, conversions: 95, revenue: 45000, roi: 375 },
    { name: 'Google Ads - Premium', channel: 'ppc', spend: 18000, conversions: 78, revenue: 38000, roi: 211 },
    { name: 'Facebook Retargeting', channel: 'social', spend: 9000, conversions: 62, revenue: 22000, roi: 244 },
    { name: 'Email - Cart Abandonment', channel: 'email', spend: 5000, conversions: 142, revenue: 35000, roi: 600 },
    { name: 'Troon Partnership', channel: 'partnership', spend: 20000, conversions: 110, revenue: 55000, roi: 275 },
    { name: 'Instagram Influencers', channel: 'social', spend: 15000, conversions: 38, revenue: 18000, roi: 20 },
    { name: 'Google Ads - Budget', channel: 'ppc', spend: 8000, conversions: 42, revenue: 16000, roi: 100 },
    { name: 'LinkedIn B2B Campaign', channel: 'social', spend: 12000, conversions: 28, revenue: 35000, roi: 292 },
    { name: 'Email Newsletter Q2', channel: 'email', spend: 6000, conversions: 88, revenue: 28000, roi: 467 },
    { name: 'Summer Tournament Special', channel: 'email', spend: 10000, conversions: 95, revenue: 42000, roi: 420 },
    { name: 'YouTube Pre-roll Ads', channel: 'video', spend: 22000, conversions: 35, revenue: 16000, roi: -27 },
    { name: 'Referral Program Launch', channel: 'referral', spend: 8000, conversions: 125, revenue: 52000, roi: 550 },
    { name: 'Google Ads - Brand', channel: 'ppc', spend: 15000, conversions: 72, revenue: 32000, roi: 213 },
    { name: 'TikTok Campaign', channel: 'social', spend: 12000, conversions: 28, revenue: 11000, roi: -8 },
    { name: 'Email - Winback Campaign', channel: 'email', spend: 7000, conversions: 68, revenue: 24000, roi: 343 },
    { name: 'Golf Magazine Partnership', channel: 'partnership', spend: 18000, conversions: 82, revenue: 38000, roi: 211 },
    { name: 'Bing Ads Experiment', channel: 'ppc', spend: 5000, conversions: 18, revenue: 7200, roi: 44 },
    { name: 'Twitter Campaign', channel: 'social', spend: 8000, conversions: 22, revenue: 8800, roi: 10 },
    { name: 'Email - VIP Exclusive', channel: 'email', spend: 4000, conversions: 92, revenue: 48000, roi: 999 },
    { name: 'Country Club Partnerships', channel: 'partnership', spend: 25000, conversions: 135, revenue: 72000, roi: 288 },
    { name: 'Podcast Sponsorships', channel: 'audio', spend: 15000, conversions: 45, revenue: 22000, roi: 47 },
    { name: 'Display Ads - Retargeting', channel: 'display', spend: 11000, conversions: 52, revenue: 20000, roi: 182 }
  ];

  for (const campaign of campaigns) {
    const startDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000);
    const endDate = new Date(startDate.getTime() + (30 + Math.random() * 60) * 24 * 60 * 60 * 1000);

    await query(`
      INSERT INTO marketing_campaigns (campaign_name, campaign_type, start_date, end_date, total_spend, conversions, revenue_generated, roi)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `, [campaign.name, campaign.channel, startDate, endDate, campaign.spend, campaign.conversions, campaign.revenue, campaign.roi]);
  }

  const count = await query('SELECT COUNT(*) as count FROM marketing_campaigns');
  console.log(`✅ Created ${count[0].count} marketing campaigns`);
}

// Seed daily_metrics (365 days)
async function seedDailyMetrics() {
  console.log('\n📈 Seeding daily_metrics...');

  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  for (let day = 0; day < 365; day++) {
    const metricDate = new Date(startDate);
    metricDate.setDate(metricDate.getDate() + day);

    // Seasonal patterns: March-May peak, July-Sept low
    const month = metricDate.getMonth();
    let seasonalFactor = 1.0;
    if (month >= 2 && month <= 4) seasonalFactor = 1.6; // March-May peak
    else if (month >= 6 && month <= 8) seasonalFactor = 0.6; // July-Sept low
    else if (month >= 10 || month <= 1) seasonalFactor = 1.2; // Nov-Feb moderate

    const baseShipments = 25;
    const shipmentCount = Math.floor(baseShipments * seasonalFactor * (0.8 + Math.random() * 0.4));
    const avgPrice = 180 + Math.random() * 80;
    const revenue = shipmentCount * avgPrice;
    const grossMargin = revenue * (0.35 + Math.random() * 0.15);
    const successRate = 88 + Math.random() * 8;
    const successfulDeliveries = Math.floor(shipmentCount * successRate / 100);
    const failedDeliveries = shipmentCount - successfulDeliveries;
    const avgDeliveryDays = 3.5 + Math.random() * 2;
    const newCustomers = Math.floor(shipmentCount * 0.3);
    const repeatCustomers = shipmentCount - newCustomers;
    const npsScore = 55 + Math.random() * 20;

    await query(`
      INSERT INTO daily_metrics (metric_date, total_shipments, successful_deliveries, failed_deliveries, delivery_success_rate, revenue, gross_margin, avg_delivery_days, new_customers, repeat_customers, nps_score)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `, [metricDate, shipmentCount, successfulDeliveries, failedDeliveries, successRate, revenue, grossMargin, avgDeliveryDays, newCustomers, repeatCustomers, npsScore]);
  }

  const count = await query('SELECT COUNT(*) as count FROM daily_metrics');
  console.log(`✅ Created ${count[0].count} daily metrics`);
}

// Seed carrier_performance
async function seedCarrierPerformance() {
  console.log('\n🚚 Seeding carrier_performance...');

  await query(`
    INSERT INTO carrier_performance (carrier, route_id, month_year, shipment_count, on_time_rate, damage_rate, avg_cost, service_failures)
    SELECT
      s.carrier,
      r.route_id,
      DATE_TRUNC('month', s.actual_pickup_date)::date as month_year,
      COUNT(*) as shipment_count,
      AVG(CASE WHEN s.actual_delivery_date <= s.scheduled_delivery_date THEN 100.0 ELSE 0.0 END) as on_time_rate,
      AVG(CASE WHEN EXISTS (SELECT 1 FROM insurance_claims ic WHERE ic.shipment_id = s.shipment_id) THEN 1.0 ELSE 0.0 END) * 100 as damage_rate,
      AVG(s.carrier_cost) as avg_cost,
      COUNT(CASE WHEN s.actual_delivery_date > s.scheduled_delivery_date THEN 1 END) as service_failures
    FROM shipments s
    JOIN routes r ON
      s.origin_city = r.origin_city AND
      s.origin_state = r.origin_state AND
      s.destination_city = r.destination_city AND
      s.destination_state = r.destination_state
    WHERE s.actual_delivery_date IS NOT NULL AND s.actual_pickup_date IS NOT NULL
    GROUP BY s.carrier, r.route_id, DATE_TRUNC('month', s.actual_pickup_date)
    HAVING COUNT(*) >= 3
  `);

  const count = await query('SELECT COUNT(*) as count FROM carrier_performance');
  console.log(`✅ Created ${count[0].count} carrier performance records`);
}

// Seed route_performance_monthly
async function seedRoutePerformanceMonthly() {
  console.log('\n🗺️  Seeding route_performance_monthly...');

  await query(`
    INSERT INTO route_performance_monthly (route_id, month_year, shipment_count, on_time_pct, damage_rate_pct, avg_transit_days, avg_margin, capacity_utilization_pct)
    SELECT
      r.route_id,
      DATE_TRUNC('month', s.actual_pickup_date)::date as month_year,
      COUNT(*) as shipment_count,
      AVG(CASE WHEN s.actual_delivery_date <= s.scheduled_delivery_date THEN 100.0 ELSE 0.0 END) as on_time_pct,
      AVG(CASE WHEN EXISTS (SELECT 1 FROM insurance_claims ic WHERE ic.shipment_id = s.shipment_id) THEN 1.0 ELSE 0.0 END) * 100 as damage_rate_pct,
      AVG((s.actual_delivery_date - s.actual_pickup_date)::numeric) as avg_transit_days,
      AVG(s.gross_margin) as avg_margin,
      (COUNT(*) * 100.0 / 50.0) as capacity_utilization_pct
    FROM shipments s
    JOIN routes r ON
      s.origin_city = r.origin_city AND
      s.origin_state = r.origin_state AND
      s.destination_city = r.destination_city AND
      s.destination_state = r.destination_state
    WHERE s.actual_delivery_date IS NOT NULL AND s.actual_pickup_date IS NOT NULL
    GROUP BY r.route_id, DATE_TRUNC('month', s.actual_pickup_date)
  `);

  const count = await query('SELECT COUNT(*) as count FROM route_performance_monthly');
  console.log(`✅ Created ${count[0].count} route performance monthly records`);
}

// Seed partner_performance
async function seedPartnerPerformance() {
  console.log('\n⛳ Seeding partner_performance...');

  await query(`
    INSERT INTO partner_performance (course_id, month_year, shipments, revenue, avg_customer_satisfaction, repeat_customer_pct, complaints)
    SELECT
      pc.course_id,
      DATE_TRUNC('month', s.actual_pickup_date)::date as month_year,
      COUNT(*) as shipments,
      SUM(s.total_price) as revenue,
      AVG(COALESCE(ns.nps_score, 7.0)) / 10.0 as avg_customer_satisfaction,
      AVG(CASE WHEN cls.total_shipments > 1 THEN 100.0 ELSE 0.0 END) as repeat_customer_pct,
      COUNT(CASE WHEN s.actual_delivery_date > s.scheduled_delivery_date THEN 1 END) as complaints
    FROM shipments s
    JOIN partner_courses pc ON s.partner_course_id = pc.course_id
    LEFT JOIN nps_surveys ns ON s.shipment_id = ns.shipment_id
    LEFT JOIN customer_lifetime_stats cls ON s.customer_id = cls.customer_id
    WHERE s.actual_pickup_date IS NOT NULL
    GROUP BY pc.course_id, DATE_TRUNC('month', s.actual_pickup_date)
  `);

  const count = await query('SELECT COUNT(*) as count FROM partner_performance');
  console.log(`✅ Created ${count[0].count} partner performance records`);
}

// Main execution
async function main() {
  console.log('🚀 Starting comprehensive analytics data seeding...\n');
  console.log('This will populate all empty analytics tables with realistic data.');
  console.log('Estimated time: 5-10 minutes\n');

  try {
    // Clean all analytics tables first
    console.log('🧹 Cleaning existing analytics data...');
    await query('DELETE FROM customer_service_tickets');
    await query('DELETE FROM tracking_events');
    await query('DELETE FROM insurance_claims');
    await query('DELETE FROM customer_sessions');
    await query('DELETE FROM customer_lifetime_stats');
    await query('DELETE FROM nps_surveys');
    await query('DELETE FROM marketing_campaigns');
    await query('DELETE FROM daily_metrics');
    await query('DELETE FROM carrier_performance');
    await query('DELETE FROM route_performance_monthly');
    await query('DELETE FROM partner_performance');
    console.log('✅ Cleanup complete\n');

    await seedTrackingEvents();
    await seedInsuranceClaims();
    await seedCustomerServiceTickets();
    await seedCustomerSessions();
    await seedCustomerLifetimeStats();
    await seedNpsSurveys();
    await seedMarketingCampaigns();
    await seedDailyMetrics();
    await seedCarrierPerformance();
    await seedRoutePerformanceMonthly();
    await seedPartnerPerformance();

    console.log('\n✅ ✅ ✅ All analytics data seeded successfully! ✅ ✅ ✅\n');

    // Print summary
    console.log('📊 Final Record Counts:');
    const tables = [
      'tracking_events',
      'insurance_claims',
      'customer_service_tickets',
      'customer_sessions',
      'customer_lifetime_stats',
      'nps_surveys',
      'marketing_campaigns',
      'daily_metrics',
      'carrier_performance',
      'route_performance_monthly',
      'partner_performance'
    ];

    for (const table of tables) {
      const result = await query(`SELECT COUNT(*) as count FROM ${table}`);
      console.log(`  ${table}: ${result[0].count.toLocaleString()} records`);
    }

    console.log('\n🎯 Database is now ready for executive question testing!');

  } catch (error) {
    console.error('\n❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
