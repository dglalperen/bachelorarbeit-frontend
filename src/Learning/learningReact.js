//! Um ein Object State in React zu ändern, verwendet man folgende Syntax:
//* setState({...state, prop: newValue})

//! Um ein Array State in React zu ändern, verwendet man folgende Syntax:
//* The Spread Operator makes a copy of the State because the setState
//* does not simply append a new Element to the Array.
//* setState([...state, newElement])

/* const fetchData = async () => {
    const response = await fetch('https://book-club-json.herokuapp.com/books%27)
    setBooks(response.json())
  }
useEffect(async () =>{
   await fetchData()
// There should be some dependency 
}, []) */

/* useEffect(() =>{
    const fetchData = async () => {
      const response = await fetch('https://book-club-json.herokuapp.com/books%27)
      const books = await response.json()
      setBooks(books)

    }
      fetchData()
  }, []) */
