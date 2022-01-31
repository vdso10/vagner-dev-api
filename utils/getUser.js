import React from 'react'

//front-end
const getUser = async (username) =>{
   
    const resUser = await fetch('https://api.github.com/users/' + username)
    const user = await resUser.json()

    const resRepos = await fetch(`https://api.github.com/users/${username}/repos`)
    const reposOriginal = await resRepos.json()

    const dontShowRepos = ['vdso10/csb-6yq7l', 'vdso10/curso_git', 'vdso10/loja_vue', 'vdso10/masterclass13',
                            'vdso10/pokemon', 'vdso10/projetos1', 'vdso10/vdso10'
]

    const isNotFork = repo => !repo.isNotFork
    const dontShowFilter = repo => dontShowRepos.indexOf(repo.full_name) === -1

    const extractData = repo =>({
        id: repo.id,
        full_name: repo.full_name,
        language: repo.language,
        stargazers_count: repo.stargazers_count
    })

    const repos = reposOriginal
                    .filter(isNotFork)
                    .filter(dontShowFilter)
                    .map(extractData)


    return{
       
       repos,
       user       
    }
}



export default getUser