interface ArtifactAsset {
    /**
     * Source relative to rootDir.
     */
    source: string;
    /**
     * Destination relative to outputDir.
     */
    target: string;
}
interface ArtifactBuilderOptions {
    rootDir: string;
    outputDir: string;
}
interface BuildArtifactOptions {
    assets: readonly ArtifactAsset[];
}
interface ArtifactCopierOptions {
    rootDir: string;
    outputDir: string;
}

declare class ArtifactBuilder {
    private options;
    constructor(options: ArtifactBuilderOptions);
    build(options: BuildArtifactOptions): void;
    private prepareDirectory;
    private copy;
}

export { type ArtifactAsset, ArtifactBuilder, type ArtifactBuilderOptions, type ArtifactCopierOptions, type BuildArtifactOptions };
