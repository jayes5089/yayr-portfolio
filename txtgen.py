# needs 'pip install pathspec'

import os
import pathspec

def load_gitignore(root_dir):
    gitignore_path = os.path.join(root_dir, ".gitignore")
    if not os.path.exists(gitignore_path):
        return pathspec.PathSpec.from_lines("gitwildmatch", [])
    with open(gitignore_path, 'r') as f:
        lines = f.readlines()
    lines.insert(0, ".git/")
    return pathspec.PathSpec.from_lines("gitwildmatch", lines)

def is_ignored(filepath, spec, root_dir):
    rel_path = os.path.relpath(filepath, root_dir)
    return spec.match_file(rel_path)

def generate_tree(root_dir, spec, prefix="", rel_path=""):
    lines = []
    try:
        entries = sorted(os.listdir(root_dir), key=lambda x: (not os.path.isdir(os.path.join(root_dir, x)), x))
    except Exception:
        return []

    for i, item in enumerate(entries):
        abs_path = os.path.join(root_dir, item)
        item_rel_path = os.path.join(rel_path, item)

        if is_ignored(abs_path, spec, "."):
            continue

        connector = "├── "
        if i == len(entries) - 1:
            connector = "└── "

        if os.path.isdir(abs_path):
            lines.append(f"{prefix}{connector}📁 {item}/")
            sub_prefix = prefix + ("│   " if i != len(entries) - 1 else "    ")
            lines.extend(generate_tree(abs_path, spec, sub_prefix, item_rel_path))
        else:
            lines.append(f"{prefix}{connector}{item}")
    return lines

def collect_file_contents(root_dir, spec):
    sections = []
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            filepath = os.path.join(dirpath, filename)
            if is_ignored(filepath, spec, root_dir):
                continue
            if filename.endswith(('.js', '.jsx', '.ts', '.tsx', '.css')):
                rel_path = os.path.relpath(filepath, root_dir)
                sections.append(f"\n// --- {rel_path} ---")
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    sections.append(content)
                except Exception as e:
                    sections.append(f"[Error reading file: {e}]")
    return sections

def write_summary(root_dir, output_file="project_summary.txt"):
    spec = load_gitignore(root_dir)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("📁 Project Structure\n")
        f.write("\n".join(generate_tree(root_dir, spec)))
        f.write("\n\n📄 File Contents\n")
        f.write("\n".join(collect_file_contents(root_dir, spec)))
    print(f"✅ Summary written to {output_file}")

if __name__ == "__main__":
    write_summary(".")
