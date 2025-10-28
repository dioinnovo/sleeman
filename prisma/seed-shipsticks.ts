import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const golfCourses = [
  { name: 'Pebble Beach Golf Links', location: 'Pebble Beach, CA', partnershipTier: 'Premium', shippingVolume: 450, latitude: 36.5674, longitude: -121.9509 },
  { name: 'St. Andrews Links', location: 'St. Andrews, Scotland', partnershipTier: 'Premium', shippingVolume: 380, latitude: 56.3447, longitude: -2.7967 },
  { name: 'Augusta National Golf Club', location: 'Augusta, GA', partnershipTier: 'Premium', shippingVolume: 520, latitude: 33.5027, longitude: -82.0204 },
  { name: 'Pinehurst Resort', location: 'Pinehurst, NC', partnershipTier: 'Premium', shippingVolume: 425, latitude: 35.1898, longitude: -79.4701 },
  { name: 'Whistling Straits', location: 'Kohler, WI', partnershipTier: 'Premium', shippingVolume: 315, latitude: 43.8447, longitude: -87.7434 },
  { name: 'Kiawah Island Golf Resort', location: 'Kiawah Island, SC', partnershipTier: 'Standard', shippingVolume: 290, latitude: 32.6051, longitude: -80.0859 },
  { name: 'TPC Scottsdale', location: 'Scottsdale, AZ', partnershipTier: 'Standard', shippingVolume: 340, latitude: 33.6058, longitude: -111.9211 },
  { name: 'Torrey Pines Golf Course', location: 'La Jolla, CA', partnershipTier: 'Standard', shippingVolume: 310, latitude: 32.9128, longitude: -117.2537 },
  { name: 'Bethpage Black Course', location: 'Farmingdale, NY', partnershipTier: 'Standard', shippingVolume: 265, latitude: 40.7454, longitude: -73.4579 },
  { name: 'Bandon Dunes Golf Resort', location: 'Bandon, OR', partnershipTier: 'Premium', shippingVolume: 225, latitude: 43.1198, longitude: -124.3923 },
  { name: 'Oakmont Country Club', location: 'Oakmont, PA', partnershipTier: 'Basic', shippingVolume: 180, latitude: 40.5209, longitude: -79.8448 },
  { name: 'Shinnecock Hills Golf Club', location: 'Southampton, NY', partnershipTier: 'Basic', shippingVolume: 195, latitude: 40.9136, longitude: -72.4521 },
  { name: 'Chambers Bay', location: 'University Place, WA', partnershipTier: 'Standard', shippingVolume: 210, latitude: 47.2093, longitude: -122.5787 },
  { name: 'Harbour Town Golf Links', location: 'Hilton Head, SC', partnershipTier: 'Standard', shippingVolume: 275, latitude: 32.1250, longitude: -80.8050 },
  { name: 'Spyglass Hill Golf Course', location: 'Pebble Beach, CA', partnershipTier: 'Premium', shippingVolume: 245, latitude: 36.5905, longitude: -121.9468 },
]

const carriers = [
  { name: 'FedEx', serviceLevel: 'Express', baseRate: 89.99, onTimeRate: 96.5, damageRate: 0.8, active: true },
  { name: 'UPS', serviceLevel: 'Standard', baseRate: 79.99, onTimeRate: 94.2, damageRate: 1.2, active: true },
  { name: 'DHL', serviceLevel: 'Overnight', baseRate: 149.99, onTimeRate: 97.8, damageRate: 0.5, active: true },
  { name: 'USPS Priority', serviceLevel: 'Standard', baseRate: 69.99, onTimeRate: 91.5, damageRate: 1.8, active: true },
  { name: 'Ship Sticks White Glove', serviceLevel: 'White Glove', baseRate: 199.99, onTimeRate: 99.2, damageRate: 0.2, active: true },
]

const customerNames = [
  'John Smith', 'Emily Rodriguez', 'Michael Chen', 'Sarah Johnson', 'David Williams',
  'Jennifer Brown', 'Robert Martinez', 'Lisa Anderson', 'James Taylor', 'Mary Thompson',
  'Christopher Lee', 'Patricia Wilson', 'Daniel Moore', 'Linda Davis', 'Matthew Garcia',
  'Barbara Miller', 'Anthony Jones', 'Susan Martinez', 'Mark Thomas', 'Elizabeth Jackson'
]

const cities = [
  { city: 'Dallas', state: 'TX', zip: '75201' },
  { city: 'New York', state: 'NY', zip: '10001' },
  { city: 'Los Angeles', state: 'CA', zip: '90001' },
  { city: 'Chicago', state: 'IL', zip: '60601' },
  { city: 'Houston', state: 'TX', zip: '77001' },
  { city: 'Phoenix', state: 'AZ', zip: '85001' },
  { city: 'Philadelphia', state: 'PA', zip: '19019' },
  { city: 'San Antonio', state: 'TX', zip: '78201' },
  { city: 'San Diego', state: 'CA', zip: '92101' },
  { city: 'Austin', state: 'TX', zip: '78701' },
  { city: 'Seattle', state: 'WA', zip: '98101' },
  { city: 'Denver', state: 'CO', zip: '80201' },
  { city: 'Boston', state: 'MA', zip: '02101' },
  { city: 'Atlanta', state: 'GA', zip: '30301' },
  { city: 'Miami', state: 'FL', zip: '33101' },
]

const equipmentTypes = ['Golf Bag', 'Travel Case', 'Push Cart', 'Golf Bag with Cart']

const damageTypes = ['Scratched', 'Dented', 'Broken Club', 'Lost Item', 'Torn Bag']

async function main() {
  console.log('Seeding Ship Sticks data...')

  // Clear existing data
  await prisma.damageClaim.deleteMany()
  await prisma.route.deleteMany()
  await prisma.shipment.deleteMany()
  await prisma.carrier.deleteMany()
  await prisma.golfCourse.deleteMany()

  // Seed Golf Courses
  console.log('Creating golf courses...')
  const createdCourses = await Promise.all(
    golfCourses.map(course =>
      prisma.golfCourse.create({
        data: course
      })
    )
  )

  // Seed Carriers
  console.log('Creating carriers...')
  const createdCarriers = await Promise.all(
    carriers.map(carrier =>
      prisma.carrier.create({
        data: carrier
      })
    )
  )

  // Seed Routes
  console.log('Creating routes...')
  const routes = []
  for (const origin of cities.slice(0, 10)) {
    for (const dest of golfCourses.slice(0, 8)) {
      const carrier = createdCarriers[Math.floor(Math.random() * createdCarriers.length)]
      const distance = 500 + Math.random() * 2500
      const avgDays = distance > 1500 ? 5 + Math.random() * 2 : 2 + Math.random() * 3

      routes.push({
        name: `${origin.city} to ${dest.name}`,
        originCity: origin.city,
        originState: origin.state,
        destinationCity: dest.location.split(',')[0],
        destinationState: dest.location.split(',')[1]?.trim() || '',
        distance,
        carrierId: carrier.id,
        avgDeliveryDays: avgDays,
        avgPrice: 70 + (distance / 10),
        shipmentCount: Math.floor(Math.random() * 50) + 10
      })
    }
  }

  await prisma.route.createMany({
    data: routes.slice(0, 100)
  })

  // Seed Shipments
  console.log('Creating shipments...')
  const now = new Date()
  const shipments = []

  for (let i = 0; i < 200; i++) {
    const customer = customerNames[Math.floor(Math.random() * customerNames.length)]
    const origin = cities[Math.floor(Math.random() * cities.length)]
    const course = createdCourses[Math.floor(Math.random() * createdCourses.length)]
    const carrier = createdCarriers[Math.floor(Math.random() * createdCarriers.length)]
    const equipmentType = equipmentTypes[Math.floor(Math.random() * equipmentTypes.length)]

    const createdDaysAgo = Math.floor(Math.random() * 60)
    const createdAt = new Date(now)
    createdAt.setDate(createdAt.getDate() - createdDaysAgo)

    const pickupDate = new Date(createdAt)
    pickupDate.setDate(pickupDate.getDate() + Math.floor(Math.random() * 3))

    const estimatedDeliveryDays = carrier.name === 'DHL' ? 1 : carrier.name === 'Ship Sticks White Glove' ? 2 : Math.floor(Math.random() * 3) + 3
    const estimatedDelivery = new Date(pickupDate)
    estimatedDelivery.setDate(estimatedDelivery.getDate() + estimatedDeliveryDays)

    // Most shipments delivered, some still in transit
    const isDelivered = createdDaysAgo > estimatedDeliveryDays
    const actualDelivery = isDelivered ? new Date(estimatedDelivery) : null
    if (actualDelivery) {
      actualDelivery.setHours(actualDelivery.getHours() + Math.floor(Math.random() * 48) - 24) // +/- 1 day variance
    }

    const deliveredOnTime = isDelivered ? actualDelivery! <= estimatedDelivery : null

    const statuses = ['PENDING', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'DELAYED']
    let status
    if (!isDelivered) {
      const daysUntilDelivery = Math.ceil((estimatedDelivery.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      if (daysUntilDelivery <= 0) status = 'OUT_FOR_DELIVERY'
      else if (daysUntilDelivery <= 2) status = 'IN_TRANSIT'
      else status = 'PICKED_UP'
    } else {
      status = 'DELIVERED'
    }

    const weight = 25 + Math.random() * 20
    const basePrice = carrier.baseRate + (weight > 35 ? 20 : 0)
    const estimatedValue = 1500 + Math.random() * 3000
    const insuranceFee = estimatedValue > 2500 ? 15 : 10
    const discountApplied = Math.random() > 0.7 ? (basePrice * 0.1) : 0
    const totalPrice = basePrice + insuranceFee - discountApplied

    shipments.push({
      shipmentNumber: `SS-2024-${10000 + i}`,
      status: status as any,
      createdAt,
      updatedAt: createdAt,
      customerName: customer,
      customerEmail: `${customer.toLowerCase().replace(' ', '.')}@email.com`,
      customerPhone: `555-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      originAddress: `${100 + Math.floor(Math.random() * 900)} Main St`,
      originCity: origin.city,
      originState: origin.state,
      originZip: origin.zip,
      destinationCourseId: course.id,
      destinationAddress: course.address || `${course.name} Pro Shop`,
      destinationCity: course.location.split(',')[0],
      destinationState: course.location.split(',')[1]?.trim() || '',
      destinationZip: '00000',
      carrierId: carrier.id,
      serviceLevel: carrier.serviceLevel,
      trackingNumber: `1Z${Math.random().toString(36).substring(2, 18).toUpperCase()}`,
      equipmentType,
      numberOfClubs: equipmentType.includes('Bag') ? 14 : null,
      estimatedValue,
      weight,
      pickupDate,
      estimatedDelivery,
      actualDelivery,
      basePrice,
      insuranceFee,
      totalPrice,
      discountApplied,
      deliveredOnTime,
      customerRating: isDelivered ? (deliveredOnTime ? Math.floor(Math.random() * 2) + 4 : Math.floor(Math.random() * 3) + 2) : null
    })
  }

  const createdShipments = await prisma.shipment.createMany({
    data: shipments
  })

  // Seed Damage Claims (only for some shipments)
  console.log('Creating damage claims...')
  const allShipments = await prisma.shipment.findMany()
  const damageClaims = []

  for (let i = 0; i < 15; i++) {
    const shipment = allShipments[Math.floor(Math.random() * allShipments.length)]
    const damageType = damageTypes[Math.floor(Math.random() * damageTypes.length)]
    const claimAmount = 100 + Math.random() * 900
    const status = ['FILED', 'UNDER_REVIEW', 'APPROVED', 'PAID'][Math.floor(Math.random() * 4)]
    const filedAt = shipment.actualDelivery ? new Date(shipment.actualDelivery.getTime() + 24 * 60 * 60 * 1000) : new Date()

    damageClaims.push({
      claimNumber: `CLM-2024-${20000 + i}`,
      shipmentId: shipment.id,
      status: status as any,
      filedAt,
      resolvedAt: status === 'PAID' ? new Date(filedAt.getTime() + 7 * 24 * 60 * 60 * 1000) : null,
      damageType,
      damageDescription: `${damageType} - Claim filed by customer`,
      claimAmount,
      approvedAmount: status === 'APPROVED' || status === 'PAID' ? claimAmount * 0.9 : null
    })
  }

  await prisma.damageClaim.createMany({
    data: damageClaims
  })

  console.log('✅ Seed completed successfully!')
  console.log(`Created:`)
  console.log(`  - ${golfCourses.length} golf courses`)
  console.log(`  - ${carriers.length} carriers`)
  console.log(`  - ${routes.length} routes`)
  console.log(`  - ${shipments.length} shipments`)
  console.log(`  - ${damageClaims.length} damage claims`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
