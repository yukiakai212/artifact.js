# @yukiakai/artifact

Create deployment artifacts by copying selected files and directories into a fresh output directory.

`@yukiakai/artifact` is useful when a project needs to assemble a separate artifact for publishing or deployment.

## Installation

```bash
npm install @yukiakai/artifact
```

## Quick start

```ts
import { createArtifactBuilder } from '@yukiakai/artifact';

const artifactBuilder = createArtifactBuilder({
  outputDirectory: '.artifact',
});

artifactBuilder.build({
  assets: [
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
  ],
});
```

## Output directory lifecycle

`createArtifactBuilder()` returns a builder with a fresh output directory:

1. If `outputDirectory` exists, it is removed recursively.
2. A new empty output directory is created.
3. `build()` copies assets into that directory.

**Caution:** do not use an output directory that contains files you need to retain. In particular, it must not be the same directory as `sourceDirectory`, or a parent of it.

Calling `build()` again does not clean the output directory again; it adds or overwrites the requested assets.

To discard the current artifact and start again:

```ts
artifactBuilder.prepareOutputDirectory();
```

## Paths

`sourceDirectory` is the base directory for every asset `source`.

```ts
const artifactBuilder = createArtifactBuilder({
  sourceDirectory: 'packages/node',
  outputDirectory: 'artifacts/node-package',
});
```

- `sourceDirectory` defaults to the current working directory.
- Relative `sourceDirectory` and `outputDirectory` values are resolved from the current working directory when `createArtifactBuilder()` is called.
- `source` is relative to `sourceDirectory`.
- `destination` is relative to `outputDirectory`.

`outputDirectory` is independent from `sourceDirectory`.

## API

### `createArtifactBuilder(options)`

```ts
interface CreateArtifactBuilderOptions {
  sourceDirectory?: string;
  outputDirectory: string;
}
```

Creates an `ArtifactBuilder` and prepares its output directory.

### `builder.build(options)`

```ts
interface BuildArtifactOptions {
  assets: readonly ArtifactAsset[];
}

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

Assets are processed in order. If a later source is missing, earlier assets may already have been copied.

## Example: package artifact

```ts
import { createArtifactBuilder } from '@yukiakai/artifact';

const artifactBuilder = createArtifactBuilder({
  outputDirectory: '.artifact',
});

artifactBuilder.build({
  assets: [
    { source: 'dist', destination: 'dist' },
    { source: 'package.json', destination: 'package.json' },
    { source: 'package-lock.json', destination: 'package-lock.json' },
    { source: 'README.md', destination: 'README.md' },
    { source: 'LICENSE', destination: 'LICENSE' },
  ],
});
```

## License

MIT © Yuki Akai
