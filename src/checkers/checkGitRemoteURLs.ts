import * as fs from "fs"
import * as path from "path"
import { exec } from "child_process"
import { checkIsGitRepo } from "./checkGitRepo"

/**
 * Check & Get remote repos' url
 * @returns
 */
export const checkGitRemoteURLs = async () => {
    const [isGitRepo, workspace] = checkIsGitRepo()
    if (!isGitRepo) {
        return null
    }

    const stdout = await new Promise<string>((reslove, reject) => {
        exec(
            `git remote -v`,
            {
                cwd: workspace as string,
            },
            (err, stdout, stderr) => {
                reslove(stdout)
            }
        )
    })

    let repos: string[][] = []

    if (!!stdout.trim()) {
        repos = stdout
            .match(
                /([a-zA-Z0-9]+)\t+http(s)?\:\/\/([^\/]+)\/([^\.]+)\.git\ +\(push\)/g
            )
            ?.map((item) => {
                let match =
                    /([a-zA-Z0-9]+)\t+http(s)?\:\/\/([^\/]+)\/([^\.]+)\.git\ +\(push\)/.exec(
                        item
                    ) as RegExpExecArray

                return [match[3], match[4]]
            }) as string[][]
    }

    // 获取当前目录下 .hugrc.json 文件下面的 remotes 字段
    const hugrcPath = path.join(workspace as string, ".hugrc.json")
    if (fs.existsSync(hugrcPath)) {
        const hugrc = fs
            .readFileSync(path.join(workspace as string, ".hugrc.json"))
            .toString()
        const remotes = JSON.parse(hugrc)["remotes"]
        if (!!remotes) {
            ;(<Array<string>>remotes).forEach((item) => {
                const remote = /http(s)?\:\/\/([^\/]+)\/([^\.]+)(\.git)?/.exec(item)
                if(!!remote) {
                    repos.push([remote[2], remote[3]])
                }
            })
        }
    }

    return [...new Set(repos)]
}
