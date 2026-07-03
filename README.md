# @yukiakai/artifact

Build deployment artifacts from project files.

`@yukiakai/artifact` provides a simple and reusable way to assemble a deployment artifact by copying selected files and directories into a clean output directory.

It is designed for release pipelines where source repositories and deployment repositories are kept separate.

## Features

* Clean output directory before building
* Copy files and directories
* Preserve directory structure
* Remap source paths to different output paths
* Validate missing source files
* Lightweight with zero runtime dependencies

---

## Installation

```bash
npm install @yukiakai/artifact
```

---

## Example

```ts
import { ArtifactBuilder } from '@yukiakai/artifact';

const builder = new ArtifactBuilder({
  rootDir: process.cwd(),
  outputDir: './artifact',
});

builder.build({
  assets: [
    {
      source: 'dist',
      target: 'dist',
    },
    {
      source: 'package.json',
      target: 'package.json',
    },
    {
      source: 'README.md',
      target: 'README.md',
    },
    {
      source: 'workspace/release/publish.yml',
      target: '.github/workflows/release.yml',
    },
  ],
});
```

---

## API

### ArtifactBuilder

```ts
new ArtifactBuilder({
  rootDir,
  outputDir,
});
```

### build()

```ts
builder.build({
  assets,
});
```

Each build:

1. Cleans the output directory.
2. Validates all asset sources.
3. Copies every asset into the output directory.

---

## Asset

```ts
interface ArtifactAsset {
  source: string;
  target: string;
}
```

| Property | Description                                       |
| -------- | ------------------------------------------------- |
| `source` | File or directory relative to the project root    |
| `target` | Destination path relative to the output directory |

---

## Use Cases

* npm package publishing
* GitHub Actions release workflows
* Artifact repositories
* CI/CD pipelines
* Deployment packaging

---

## License

MIT Yuki Akai
