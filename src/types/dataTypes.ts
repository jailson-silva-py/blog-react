interface Usuario {id:number, usuario:string, senha:string}

interface ComentarioType {

    id:number,
    postId:number,
    titulo:string,
    estrelas:number,
    conteudo:string,
    autor:string


}

interface PostType {

    id:number,
    titulo:string,
    conteudo:string,
    dataPostagem:string,
    principal:boolean

}