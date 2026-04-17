import pandas as pd
import os

# Path to the CSV
CSV_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "scrapper", "combined_output.csv")

def load_jobs():
    try:
        df = pd.read_csv(CSV_PATH)

        # Normalize column names (lowercase, no leading/trailing spaces)
        df.columns = [col.strip().lower() for col in df.columns]
        df.fillna("", inplace=True)

        # Add 'id' column if not already present
        if "id" not in df.columns:
            df["id"] = df.index

        return df
    except Exception as e:
        print("Error loading jobs:", e)
        return pd.DataFrame()


def filter_jobs(search="", location="", experience=""):
    df = load_jobs()

    if search:
        search = search.lower()
        df = df[df.apply(lambda row: search in str(row).lower(), axis=1)]

    if location and "locations" in df.columns:
        df = df[df["locations"].str.lower().str.contains(location.lower(), na=False)]

    if experience and "experience" in df.columns:
        df = df[df["experience"].str.lower().str.contains(experience.lower(), na=False)]

    return df.to_dict(orient="records")