# @yukiakai/artifact

Build deployment artifacts from selected project files and directories.

`@yukiakai/artifact` copies assets from a source directory into an output directory. It is intended for release and deployment pipelines that need a separately assembled artifact.

## Installation

```bash
npm install @yukiakai/artifact
```

## Quick start

```ts
import { ArtifactBuilder } from '@yukiakai/artifact';

const artifactBuilder = new ArtifactBuilder({
  sourceDirectory: process.cwd(),
  outputDirectory: '.artifact',
});

artifactBuilder
  .wipeOutputDirectory()
  .build([
    {
      source: 'dist',
      destination: 'dist',
    },
    {
      source: 'package.json',
      destination: 'package.json',
    },
    {
      source: 'README.md',
      destination: 'README.md',
    },
    {
      source: 'workspace/release/publish.yml',
      destination: '.github/workflows/release.yml',
    },
  ]);
```

## Output directory lifecycle

Creating an `ArtifactBuilder` does not create, remove, or modify the output directory. Choose the lifecycle operation explicitly before calling `build()`.

| Method | Behavior |
| --- | --- |
| `ensureOutputDirectory()` | Creates the output directory and its parents when absent. Keeps its existing contents. |
| `removeOutputDirectory()` | Removes the output path recursively. Does nothing when it is absent. |
| `wipeOutputDirectory()` | Removes the output path, then creates a new empty output directory. |

All lifecycle methods return the same builder, so they can be chained with `build()`.

```ts
artifactBuilder
  .wipeOutputDirectory()
  .build(assets);
```

`build()` does not prepare the output directory itself. It throws if the directory does not exist; call `ensureOutputDirectory()` to append to an existing artifact, or `wipeOutputDirectory()` to create a fresh one.

**Caution:** `removeOutputDirectory()` and `wipeOutputDirectory()` are destructive. `outputDirectory` must not be the same directory as `sourceDirectory`, or a parent of it.

## Paths

`sourceDirectory` is the base directory for every asset `source`. Each asset `destination` is relative to `outputDirectory`.

```ts
const artifactBuilder = new ArtifactBuilder({
  sourceDirectory: 'packages/node',
  outputDirectory: 'artifacts/node-package',
});
```

| Value | Meaning |
| --- | --- |
| `sourceDirectory` | Base directory used to resolve asset sources. |
| `outputDirectory` | Root directory that receives the assembled artifact. |
| `asset.source` | File or directory path relative to `sourceDirectory`. |
| `asset.destination` | File or directory path relative to `outputDirectory`. |

## API

### `new ArtifactBuilder(options)`

```ts
interface ArtifactBuilderOptions {
  sourceDirectory: string;
  outputDirectory: string;
}
```

### `builder.build(assets)`

```ts
interface ArtifactAsset {
  source: string;
  destination: string;
}
```

Copies every asset into the output directory.

- Files are copied directly.
- Directories are copied recursively.
- Missing parent directories for a destination are created automatically.
- A missing source throws an error.
- Assets are processed in order; if a later source is missing, earlier assets may already have been copied.

## Example: package artifact

```ts
import { ArtifactBuilder } from '@yukiakai/artifact';

const artifactBuilder = new ArtifactBuilder({
  sourceDirectory: process.cwd(),
  outputDirectory: '.artifact',
});

artifactBuilder
  .wipeOutputDirectory()
  .build([
    { source: 'dist', destination: 'dist' },
    { source: 'package.json', destination: 'package.json' },
    { source: 'package-lock.json', destination: 'package-lock.json' },
    { source: 'README.md', destination: 'README.md' },
    { source: 'LICENSE', destination: 'LICENSE' },
  ]);
```

## License

MIT © Yuki Akai
