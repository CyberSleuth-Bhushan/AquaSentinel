# Use official Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy dependencies file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY ./app /app/app

# Expose port
EXPOSE 8000

# Command to run API
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
