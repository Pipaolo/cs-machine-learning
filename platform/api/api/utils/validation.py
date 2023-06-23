import pandas as pd


def get_min_max_from_dataset(file_name: str) -> tuple[float, float]:
    """Get the minimum and maximum values from a dataset.

    Args:
        file_name (str): The name of the file to read from.

    Returns:
        tuple[float, float]: The minimum and maximum values.
    """
    df = pd.read_csv(file_name)
    return df.min(), df.max()
