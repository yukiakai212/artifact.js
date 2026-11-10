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

interface ArtifactBuilderOptions {
    sourceDirectory: DirectoryPath;
    outputDirectory: DirectoryPath;
}
declare class ArtifactBuilder {
    private options;
    constructor(options: ArtifactBuilderOptions);
    build(assets: ArtifactAsset[]): this;
    ensureOutputDirectory(): this;
    removeOutputDirectory(): this;
    wipeOutputDirectory(): this;
    private assertOutputDirectoryExists;
    private assertOutputDirectoryDoesNotContainSourceDirectory;
    private copy;
}

export { type AbsoluteDirectoryPath, type ArtifactAsset, ArtifactBuilder, type ArtifactBuilderOptions, type DirectoryPath, type RelativeDirectoryPath, type RelativeFileOrDirectoryPath, type RelativeFilePath };
