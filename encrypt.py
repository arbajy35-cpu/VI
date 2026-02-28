import os
import zipfile
import sys

# 🔐 Simple XOR Key
KEY = 0x5A

# 📁 Detect project root (script location = project root)
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

ASSETS_DIR = os.path.join(PROJECT_ROOT, "app", "src", "main", "assets")
OUTPUT_DIR = ASSETS_DIR   # ✅ Direct inside assets
TEMP_ZIP = os.path.join(PROJECT_ROOT, "temp_bundle.zip")
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "pkg_enc")

print("📂 Project Root:", PROJECT_ROOT)
print("📦 Assets Dir:", ASSETS_DIR)

# ❌ Stop if assets folder missing
if not os.path.exists(ASSETS_DIR):
    print("❌ ERROR: Assets directory not found!")
    sys.exit(1)


def create_zip():
    print("\n📦 Creating ZIP bundle...")

    with zipfile.ZipFile(TEMP_ZIP, "w", zipfile.ZIP_DEFLATED) as z:
        for root, dirs, files in os.walk(ASSETS_DIR):
            for file in files:

                # 🚫 Skip encrypted file if exists
                if file == "pkg_enc":
                    continue

                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, ASSETS_DIR)

                z.write(full_path, rel_path)
                print("  + Added:", rel_path)

    print("✅ ZIP created.")


def encrypt_zip():
    print("\n🔐 Encrypting bundle...")

    with open(TEMP_ZIP, "rb") as f:
        data = f.read()

    encrypted = bytes([b ^ KEY for b in data])

    # Remove old pkg_enc if exists
    if os.path.exists(OUTPUT_FILE):
        os.remove(OUTPUT_FILE)

    with open(OUTPUT_FILE, "wb") as f:
        f.write(encrypted)

    print("✅ Encrypted package created:", OUTPUT_FILE)


def cleanup():
    if os.path.exists(TEMP_ZIP):
        os.remove(TEMP_ZIP)
        print("🧹 Temp file cleaned.")


if __name__ == "__main__":
    create_zip()
    encrypt_zip()
    cleanup()
    print("\n🚀 SECURE BUILD DONE ✅")
