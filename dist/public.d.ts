type RelativeFilePath = string;
type RelativeDirectoryPath = string;
type AbsoluteDirectoryPath = string;
type DirectoryPath = RelativeDirectoryPath | AbsoluteDirectoryPath;
type RelativeFileOrDirectoryPath = RelativeFilePath | RelativeDirectoryPath;
interface ArtifactAsset {
    /**
     * Path relative to sourceDirectory.
     */
    source: RelativeFileOrDirectoryPath;
    /**
     * Destination path relative to outputDirectory.
     */
    destination: RelativeFileOrDirectoryPath;
}

interface BuildArtifactOptions {
    assets: readonly ArtifactAsset[];
}
interface ArtifactBuilderOptions {
    sourceDirectory: DirectoryPath;
    outputDirectory: DirectoryPath;
}
declare class ArtifactBuilder {
    private options;
    constructor(options: ArtifactBuilderOptions);
    build(options: BuildArtifactOptions): void;
    prepareOutputDirectory(): void;
    private copy;
}

interface CreateArtifactBuilderOptions {
    sourceDirectory?: DirectoryPath;
    outputDirectory: DirectoryPath;
}
declare function createArtifactBuilder(options: CreateArtifactBuilderOptions): ArtifactBuilder;

export { type AbsoluteDirectoryPath, type ArtifactAsset, ArtifactBuilder, type ArtifactBuilderOptions, type BuildArtifactOptions, type CreateArtifactBuilderOptions, type DirectoryPath, type RelativeDirectoryPath, type RelativeFileOrDirectoryPath, type RelativeFilePath, createArtifactBuilder };
