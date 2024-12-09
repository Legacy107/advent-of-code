line = '2333133121414131402'

# Parse the disk map into lengths
lengths = list(map(int, line))

# Build the initial disk representation
blocks = []
file_id = 0
for i, length in enumerate(lengths):
    if i % 2 == 0:
        blocks.extend([file_id] * length)
        file_id += 1
    else:
        blocks.extend([None] * length)

# Simulate moving file blocks
left_free = 0
right_file = len(blocks) - 1

while left_free < right_file:
    # Find the leftmost free space
    while left_free < len(blocks) and blocks[left_free] is not None:
        left_free += 1

    # Find the rightmost file block
    while right_file >= 0 and blocks[right_file] is None:
        right_file -= 1

    if left_free < right_file:
        # Move the rightmost file block to the leftmost free space
        blocks[left_free] = blocks[right_file]
        blocks[right_file] = None

# Calculate the checksum
checksum = sum(i * id for i, id in enumerate(blocks) if id is not None)
print(checksum)
# print(''.join(str(id) if id is not None else '.' for id in blocks))
