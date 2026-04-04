# Build stage
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY . .
# Fix Windows CRLF line endings for Linux and make Maven executable
RUN sed -i 's/\r$//' mvnw
RUN chmod +x mvnw
# Build the application
RUN ./mvnw clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# Copy the compiled JAR from the build stage
COPY --from=build /app/target/pts-backend-0.0.1-SNAPSHOT.jar app.jar

# Expose the port Render will use (though Render overrides this with PORT env var)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
