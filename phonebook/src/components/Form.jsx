const Form = ({valname, onChangeNam, valnum, onChangeNum, onClick}) => {
    return (
      <form>
        <div>
          name: <input value = {valname} onChange={onChangeNam}/>
        </div>
        <div>number: <input value = {valnum} onChange={onChangeNum}/></div>
        <div>
          <button type="submit" onClick = {onClick}>add</button>
        </div>
      </form>
    )
}
export default Form