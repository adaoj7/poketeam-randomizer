const Stats = (pokemon: any) => {

    interface Stats {
        base_stat: number
        stat: {
                name: string
            }
    }

    const pokemonStats = pokemon.pokemon.stats.map((ele:Stats ,i:number) => {
        return <div key={i}>{ele.stat.name}: {ele.base_stat}</div>
    })
  return (
    <>
    {console.log(pokemon.pokemon)}
    {pokemonStats}
    </>
  )
}

export default Stats