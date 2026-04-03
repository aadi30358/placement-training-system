FROM eclipse-temurin:21-jdk
WORKDIR /app

# Copy the rest of the application
COPY . .

# Make the Maven wrapper executable
RUN chmod +x mvnw

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose the port Render will use
EXPOSE 8080

# Run the application
CMD ["sh", "-c", "java -jar target/*.jar"]
