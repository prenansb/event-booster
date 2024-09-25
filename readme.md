# 1. Setup Development Environment
  1.1 Install Node.js and necessary dependencies.
  1.2 Set up PostgreSQL database.
  1.3 Configure Redis for caching and ranking.
  1.4 Initialize project structure with appropriate directories and files.
  1.5 Set up environment variables for development and production.
  
# 2. Design Database Schema
  2.1 Create users table with fields: id, name, email, referral_code, referred_by, created_at, etc.
  2.2 Create referrals table to track direct and hierarchical referrals.
  2.3 Create link_clicks table to store referral link click data.
  2.4 Define indexes and constraints to optimize query performance.

# 3. Implement User Subscription (FR01)
  3.1 Develop API endpoint POST /subscribe for user registration.
  3.2 Validate input data: ensure name and email are provided.
  3.3 Implement logic to prevent duplicate email subscriptions.
  3.4 Add checks to allow subscriptions only within event start and end dates.
  3.5 Save user data to the PostgreSQL database upon successful validation.

# 4. Generate Referral Links (FR02)
  4.1 Upon successful subscription, generate a unique referral code for the user.
  4.2 Create API endpoint GET /users/{id}/referral-link to retrieve the user's referral link.
  4.3 Store the referral code in the user's database record.

# 5. Track Referrals and Conversions (FR03)
  5.1 When a referral link is clicked, record the click in the link_clicks table.
  5.2 Update referral counts when a new user subscribes via a referral link.
  5.3 Implement hierarchical tracking to count referrals from invites created by referred users.
  5.4 Calculate the conversion rate: ratio of subscriptions to link clicks for each user.
  5.5 Update the user's referral statistics in the database.

# 6. Display Referral Statistics to Users
  6.1 Develop API endpoint GET /users/{id}/referrals to show referral counts.
  6.2 Display both direct and hierarchical referral numbers.
  6.3 Provide conversion rate data in the response.

# 7. Implement Referral Ranking (FR04)
  7.1 Create API endpoint GET /ranking to retrieve the referral leaderboard.
  7.2 Allow users to filter rankings by date within the event duration.
  7.3 Use Redis to cache ranking data for quick retrieval.
  7.4 Ensure the ranking is ordered by the number of completed referrals.

# 8. Ensure Security and Compliance
  8.1 Implement rate limiting on APIs to prevent abuse.
  8.2 Use parameterized queries to protect against SQL injection.
  8.3 Sanitize all user inputs across the application.
  8.4 Add HTTPS support for secure data transmission.

# 9. Implement JWT Authentication for Admin Access
  9.1 Set up JWT authentication mechanism.
  9.2 Develop admin login endpoint POST /admin/login.
  9.3 Protect admin routes using JWT middleware.
  9.4 Define admin-specific APIs for managing the event and users.

# 10. Develop API Documentation with Swagger/OpenAPI
  10.1 Annotate API endpoints with Swagger comments.
  10.2 Generate Swagger UI for interactive API exploration.
  10.3 Ensure all endpoints are well-documented with request and response models.

# 11. Achieve 90%+ Automated Test Coverage
  11.1 Write unit tests for all functions and modules.
  11.2 Create integration tests for API endpoints.
  11.3 Set up test coverage reporting tools.
  11.4 Continuously monitor and maintain test coverage as codebase evolves.

# 12. Optimize Performance to Meet Response Time Requirements
  12.1 Optimize database queries and use indexes effectively.
  12.2 Implement efficient caching strategies with Redis.
  12.3 Conduct performance testing to ensure APIs respond within 200ms.
  12.4 Profile and optimize slow-performing code segments.

# 13. Integrate Monitoring and Analytics Tools
  13.1 Choose an external platform (e.g., Sentry, Datadog) for monitoring.
  13.2 Instrument the application to track metrics:
  Requests per second
  System load
  API response times
  Request tracing
  Overall usage statistics
  13.3 Set up alerts and dashboards for real-time monitoring.

# 14. Implement Event Date Validation Across Features
  14.1 Ensure all date validations use a centralized configuration.
  14.2 Update features to respect event start and end dates (subscriptions, rankings, etc.).
  14.3 Add unit tests to cover date-related business logic.

# 15. Finalize and Deploy Application
  15.1 Prepare deployment scripts and environment configurations.
  15.2 Conduct final testing in a staging environment.
  15.3 Deploy the application to the production server.
  15.4 Monitor the application post-deployment for any issues.

# 16. Project Documentation and Handover
  16.1 Create comprehensive documentation for the codebase.
  16.2 Include setup instructions and dependency listings.
  16.3 Document API usage and provide examples.
  16.4 Prepare a handover report summarizing the project and any future considerations.


  # Todo
   1. change create user to subscribe to event
   2. add referred_by
   3. how to fk from the same table