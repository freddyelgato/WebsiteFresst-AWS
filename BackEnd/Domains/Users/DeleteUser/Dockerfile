# Use a base image of Python
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy your project files to the container
COPY . /app

# Install the necessary dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port on which Flask is running
EXPOSE 5001

# Command to run the microservice with Gunicorn
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5001"]
