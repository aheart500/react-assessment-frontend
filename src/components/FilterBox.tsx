import React, { useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import { Categories } from '../CONSTATNS';
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip:{
      margin: '0.1rem 0.4rem'
    },
    input: {
        margin: '0 1rem 1rem'
    },
    centerFlex: {
        display: 'flex', alignItems: 'center', flexWrap: 'wrap'
    }
  }),
);
export interface FilterState {
    categories: string[];
    tags: string[];
} 
interface FilterProps{
    setFilter: React.Dispatch<React.SetStateAction<FilterState>>
    filter: FilterState
}
const FilterBox = ({filter, setFilter}: FilterProps) => {
    const [newTag, setNewTag] = useState('')
    const classes = useStyles()
    const handleSelectCategory = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setFilter({categories: e.target.checked ? [...filter.categories, e.target.name] : filter.categories.filter(cat=> cat !== e.target.name),
          tags: filter.tags}) 
      }
      const handleAddChip =(e: React.KeyboardEvent<HTMLDivElement>) =>{
        if(e.key === 'Enter'){
          let tag = newTag
          if(!tag.startsWith('#')) tag = '#' + tag
          setFilter({categories: filter.categories, tags: filter.tags.concat(tag)})
          setNewTag('')
      }
    }
      const handleDeleteChip = (tag: string) =>  setFilter({categories: filter.categories, tags: filter.tags.filter(gTag=> tag !==gTag)})
    return (
        <div>
            <div>
            Filter by categry:  {['None',...Categories].map(categ => <FormControlLabel key={categ}
                control={<Checkbox name={categ} onChange={handleSelectCategory} />} label={categ} />)}
            </div>
            <div className={classes.centerFlex} >
            Filter by tag: <TextField value={newTag} className={classes.input} placeholder='Enter your tag'
            onChange={(e)=> setNewTag(e.target.value)} onKeyPress={handleAddChip}/> 
            {filter.tags.map((tag, i)=> <Chip key={i} color="primary" className={classes.chip} onDelete={() =>handleDeleteChip(tag)}  label={tag} />)} 
            </div>
        </div>
    )
}

export default FilterBox
