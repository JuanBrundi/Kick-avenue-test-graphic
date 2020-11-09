function sellingDataAction(){
  return (dispatch, getState) => {
    fetch("https://develop3.kickavenue.com/products/sale-history?ids=6")
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: "FETCH_SELLING_DATA",
        payload: data
      })
    })
  }
}

export default sellingDataAction