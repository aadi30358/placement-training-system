FROM eclipse-temurin:21-jdk
WORKDIR /app

# Copy the rest of the application
COPY . .

# Fix Windows CRLF line endings for Linux and make Maven executable
RUN sed -i 's/\r$//' mvnw
RUN chmod +x mvnw

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose the port Render will use
EXPOSE 8080

# Run the application (Target the specific jar to avoid .original matching)
CMD ["sh", "-c", "java -jar target/pts-backend-0.0.1-SNAPSHOT.jar"]
