# save this as encrypt.py
key = 0x5A  # random key

with open("index.html", "rb") as f:
    data = f.read()

encrypted = bytes([b ^ key for b in data])

with open("index.enc", "wb") as f:
    f.write(encrypted)

print("index.enc created!")
