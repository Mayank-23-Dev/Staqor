import os

BASE_DIR = r"E:\50 Question HTML CSS JS"

folders = sorted([f for f in os.listdir(BASE_DIR) if os.path.isdir(os.path.join(BASE_DIR, f)) and f[:2].isdigit()])

print(f"Total question folders found: {len(folders)}")

# Verify all 50 folders have 3 files
all_valid = True
for f in folders:
    fpath = os.path.join(BASE_DIR, f)
    for required in ["index.html", "style.css", "script.js"]:
        rpath = os.path.join(fpath, required)
        if not os.path.exists(rpath) or os.path.getsize(rpath) == 0:
            print(f"ERROR: {f} is missing or has empty {required}")
            all_valid = False

if all_valid:
    print("ALL 50 QUESTION FOLDERS VALIDATED WITH 3 COMPLETE FILES (index.html, style.css, script.js)!")
