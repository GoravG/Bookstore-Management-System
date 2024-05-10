FROM mysql:8

# Copy initialization script
COPY ./ /docker-entrypoint-initdb.d

# Health check for MySQL service
HEALTHCHECK --interval=10s --timeout=5s --retries=5 \
    CMD mysqladmin ping -h localhost || exit 1

# Expose MySQL port
EXPOSE 3306