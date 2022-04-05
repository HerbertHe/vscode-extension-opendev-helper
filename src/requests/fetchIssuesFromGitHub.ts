import fetch from "node-fetch"
import { GitHubOpenAPI } from "./APIs"

/**
 * fetch Issues From GitHub
 * @param repo owner/repo
 */
export const fetchIssuesFromGitHub = async (repo: string) => {
    const res = await fetch(`${GitHubOpenAPI}/${repo}/issues`)
    if (res.status === 200) {
        const data = await res.json()
        // title, html_url
        console.log(data)
    }

    return Promise.reject([ res.status, res.statusText ])
}
