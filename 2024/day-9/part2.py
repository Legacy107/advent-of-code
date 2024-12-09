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

# Function to find the leftmost span of free space that can fit the file
def find_leftmost_free_span(blocks, file_length):
    free_length = 0
    start_index = -1
    for i, block in enumerate(blocks):
        if block is None:
            if free_length == 0:
                start_index = i
            free_length += 1
            if free_length == file_length:
                return start_index
        else:
            free_length = 0
            start_index = -1
    return -1

# Attempt to move each file exactly once in order of decreasing file ID number
for file_id in range(file_id - 1, -1, -1):
    file_length = lengths[file_id * 2]
    file_start = blocks.index(file_id)
    file_end = file_start + file_length - 1

    # Find the leftmost span of free space that can fit the file
    leftmost_free_span = find_leftmost_free_span(blocks, file_length)
    if leftmost_free_span != -1 and leftmost_free_span < file_start:
        # Move the file to the leftmost free space
        for i in range(file_length):
            blocks[leftmost_free_span + i] = file_id
            blocks[file_start + i] = None

# Calculate the checksum
checksum = sum(i * id for i, id in enumerate(blocks) if id is not None)
print(checksum)
# print(''.join(str(id) if id is not None else '.' for id in blocks))
