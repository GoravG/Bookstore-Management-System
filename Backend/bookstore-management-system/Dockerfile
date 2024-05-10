# Use a base image with Java and Maven installed
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests
FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
RUN apt update && apt install -y curl
# Health check endpoint for backend service
HEALTHCHECK --interval=10s --timeout=5s --retries=5 \
    CMD curl -f http://backend:8080/actuator/health || exit 1
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]