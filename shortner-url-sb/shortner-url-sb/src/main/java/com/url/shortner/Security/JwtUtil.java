package com.url.shortner.Security;

import com.url.shortner.Service.UserDetailImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class JwtUtil {

    private static final String SECRET_KEY ="u1TXz2kuG5WgGZ5XAV8gWz39svs9vmXiGqWZRrg2Mx0=";

    public String getJwtFromHeader(HttpServletRequest request){
        String token =null;
        String bearerToken = request.getHeader("Authorization");
        if(bearerToken!=null && bearerToken.startsWith("Bearer")){
            token = bearerToken.substring(7);
            return token;
        }
        return null;
    }

    public String generateToken(UserDetailImpl userDetail){
        String username = userDetail.getUsername();
        String roles = userDetail.getAuthorities().stream().map(auth->auth.getAuthority()).collect(Collectors.joining(","));
        return Jwts.builder()
                .claim("roles",roles)
                .subject(username)
                .header().type("JWT")
                .and()
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+172800000))
                .signWith(getSignKey(),Jwts.SIG.HS256)
                .compact();
    }

    public String getUsernameFromToken(String token){
        return extractClaims(token,Claims::getSubject);
    }

    public boolean validateToken(String token){
        try{
            Jwts.parser().verifyWith(getSignKey()).build().parseSignedClaims(token);
            return true;
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }
    public Date extractExpiration(String token){
        return extractClaims(token, Claims::getExpiration);
    }


    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSignKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    public <T>T extractClaims(String token, Function<Claims,T> claimRecolver ){
        final Claims claims = extractAllClaims(token);
        return claimRecolver.apply(claims);
    }

    public SecretKey getSignKey(){
        byte[] keys = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keys);
    }
}
