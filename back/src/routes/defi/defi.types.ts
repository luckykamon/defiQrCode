export interface Defi {
    name: string,
    image: {
        path: string | null,
        alt: string | null
    },
    description: string,
    fichier: {
        path: string | null,
        alt: string | null
    },
    password: string
}
