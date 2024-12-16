package com.example.demo;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
public class IpRateLimitingFilter extends AbstractGatewayFilterFactory<IpRateLimitingFilter.Config> {

    private final RedisTemplate<String, Integer> redisTemplate; // To interact with redis

    public IpRateLimitingFilter(RedisTemplate<String, Integer> redisTemplate) {
        super(Config.class);
        this.redisTemplate = redisTemplate;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String ip = exchange.getRequest().getRemoteAddress().getAddress().getHostAddress(); // The ip address is extracted from remote address
            String key = "rate_limit:" + ip; // Generating unique key this will help to store and retrieve request count in redis
            Integer requests = redisTemplate.opsForValue().get(key); // This will retrieve the current request count for the key if no key then it will return null

            if (requests == null) {
                redisTemplate.opsForValue().set(key, 1, Duration.ofSeconds(1)); // key, value, duration Here i am blocked the user for 1sec if exceeds
            } else if (requests < 20) {
                redisTemplate.opsForValue().increment(key);
            } else {
                exchange.getResponse().setStatusCode(HttpStatus.TOO_MANY_REQUESTS);
                return exchange.getResponse().setComplete();
            }

            return chain.filter(exchange);
        };
    }

    public static class Config {
        // Configuration properties if needed
    }
}