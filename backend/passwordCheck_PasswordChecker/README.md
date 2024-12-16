## This service is a part of password checker project.
### It uses eureka discovery client and feign client to get password policy from userService and checks with the requested one.

-- Here DTO has been created for checking request and a passwordPolicyDTO to store the data that comes
-- This service returns true or false based on the policy