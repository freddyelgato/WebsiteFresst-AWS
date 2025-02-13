# Use the official, lightweight MariaDB image
FROM mariadb:latest  

# Set environment variables for the root password and database name
ENV MARIADB_ROOT_PASSWORD=rootpassword
ENV MARIADB_DATABASE=BranchesDB

# Expose the MariaDB port (3306) for external connections
EXPOSE 3306  

# Copy the SQL initialization file into the container's /docker-entrypoint-initdb.d/ directory
# The file will be automatically executed during the initial database setup
COPY init.sql /docker-entrypoint-initdb.d/
