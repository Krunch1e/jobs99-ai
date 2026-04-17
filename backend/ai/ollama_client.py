# backend/ai/ollama_client.py
import requests
import os
import time

def generate_llm_response(prompt: str, model: str = "llama3"):
    # Get Ollama URL from environment variable
    ollama_url = os.getenv("OLLAMA_URL", "http://localhost:11434")
    
    # Add retry logic for better reliability
    max_retries = 3
    retry_delay = 2
    
    for attempt in range(max_retries):
        
        try:
            response = requests.post(
                f"{ollama_url}/api/generate",
                json={"model": model, "prompt": prompt, "stream": False},
                timeout=300  # Increased 300-second timeout
            )
            
            if response.status_code == 200:
                return response.json()["response"].strip()
            else:
                error_msg = f"Ollama response failed: {response.status_code}"
                if response.text:
                    error_msg += f" - {response.text}"
                
                # If it's a retryable error, try again
                if response.status_code in [500, 502, 503, 504] and attempt < max_retries - 1:
                    print(f"Attempt {attempt + 1} failed, retrying in {retry_delay} seconds...")
                    time.sleep(retry_delay)
                    continue
                else:
                    # If it's not retryable or the last attempt, raise an exception
                    raise RuntimeError(f"[ERROR] {error_msg}")

        except requests.exceptions.Timeout as e:
            if attempt < max_retries - 1:
                print(f"Request timeout (attempt {attempt + 1}), retrying in {retry_delay} seconds...")
                time.sleep(retry_delay)
                continue
            # Raise an exception on the final timeout
            raise TimeoutError(f"[ERROR] Ollama request timeout after {max_retries} attempts: {str(e)}")
        
        except Exception as e:
            # Re-raise any other exceptions to be handled by the main application
            raise
            
    # This line is a fallback, but the loop should handle all cases
    raise RuntimeError("[ERROR] Max retries exceeded without a successful response.")