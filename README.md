# Uber Eats Backend

The Backend of Uber Eats Clone

## User Entity:

- id
- createdAt
- updatedAt
- email
- password
- role(client|owner|delivery)

## User CRUD:

- Create Account
- Log In
- See Profile
- Edit Profile
- Verify Email

## Restaurant Entity:

- name
- category
- address
- coverImage

## Edit Restaurant

- Edit Restaurant
- Delete Restaurant

- See Categories
- See Restaurants by Category (pagination)
- See Restaurants (pagination)
- See Restaurant
- Search Restaurant

- Create Dish
- Edit Dish
- Delete Dish

- Orders CRUD
- Orders Subscription:

  - Pending Orders (Owner) (s: newOrder) (t: CreateOrder(newOrder))
  - Pending Pickup Order (Delivery) (s: orderUpdate) (t: editOrder(orderUpdate))
  - Order Status (Customer, Delivery, Owner) (s: orderUpdate) (t: editOrder(orderUpdate))

- Add Driver to Order

- Payments (CRON)
