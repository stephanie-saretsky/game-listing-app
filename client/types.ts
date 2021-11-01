
export interface GameListingInterface {
    _id: string,
    category: string,
    title: string,
    subtitle: string,
    description: string,
    images: GameListingImage[],
    type: number,
    tags: string[],
    author: string,
    replayBundleUrlJson: string,
    duration: number,
    isDownloadable: boolean,
    isStreamable: boolean,
    version: string
}

export interface GameListingImage {
    id: string,
    url: string,
    type: number
}
