const Moveset = (pokemon: any) => {

    interface Moves {
        move:{
            name: string
        }
        version_group_details: any
    }

    const pokemonMoves = pokemon.pokemon.moves.map((ele:Moves ,i:number) => {

        const newArr = ele.version_group_details.filter((ele:any, i:number) => {
           return ele.version_group.name === 'emerald'
        })
        return <>
        {console.log(newArr)}
        </>
    })
  return (
    <>{pokemonMoves}</>
  )
}

export default Moveset