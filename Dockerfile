# Dockerfile - Simplified Single-Stage Build for Reliability
ARG PYTHON_VERSION=3.13.5
FROM python:${PYTHON_VERSION}-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN python -m spacy download en_core_web_sm

# Create a non-privileged user
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

# Create uploads directory and set ownership
RUN mkdir -p /app/uploads && chown -R appuser:appuser /app

# Copy the application source code
COPY --chown=appuser:appuser . .

# Switch to the non-privileged user
USER appuser

# Expose port 8000
EXPOSE 8000

# The command to run your application using uvicorn with an increased timeout
CMD ["uvicorn", "backend.main:app", "--host=0.0.0.0", "--port=8000", "--timeout-keep-alive", "300"]