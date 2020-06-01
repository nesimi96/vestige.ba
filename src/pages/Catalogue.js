import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import '../sass/main.scss';
import Filter from '../components/CatalogueComponents/Filter/Filter';
import FilterPath from '../components/CatalogueComponents/Filter/FilterPath';
import CataloguePreview from '../containers/CataloguePreview/CataloguePreview';
import Pagination from '../components/Pagination/Pagination';
import Connect from '../components/Connect/Connect';
import Brands from '../components/Brands/Brands';
import { connect } from 'react-redux';
import * as action from '../store/actions/actions';

const Catalogue = (props) => {

    const [parfumData, setParfumData] = useState(null);
    const [category, setCategory] = useState();
    const [filterData, setFilterData] = useState([]);
    const [sort, setSort] = useState('Najpopularniji');
    const [parfCategory, setParfCategory] = useState('55ml')
    const [page, setPage] = useState(1);
  
    // 1
    useEffect(() => {
       window.scrollTo(0, 0);
       axios.get('https://vestige-2172c.firebaseio.com/perfums.json')
       .then(res => {
           const extractData = Object.values(res.data);
           let data = sortingArraysByPathname(extractData);
           setParfumData(data);
       })
       .catch(error => console.log(error))
    }, [props.route.location.pathname])


    // Catch when route is changed
    const routeID = +props.route.match.params.id
    useEffect(() => {
        setPage(routeID)
    }, [routeID])

    // CHANGE PAGE
    const changePage = (func) => {
        console.log(func)
        let newUrl = changeUrl(func);
        props.route.history.push(newUrl)
        window.scrollTo(null, 0);
    }
    
    // Take old url and set new one..
    const changeUrl = (func) => {
        let oldUrl = props.route.match.path;
        let urlSplited = oldUrl.split('page=')
        urlSplited[1] = func;
        let joinedUrl = urlSplited.join('page=')
          
        return joinedUrl
    }


    let pathname = props.route.location.pathname;
    
    // DELETE SOME BRAND FILTER
    const removeFilter = (filterItem) => {
        const copiedFilterData = [...filterData];
        copiedFilterData.forEach((curFilter, index) => {
            if(curFilter.option === filterItem){
                copiedFilterData.splice(index, 1);
                setFilterData(copiedFilterData)
            }
        })
    }
    
    // 1 Sorting by starting path
    const sortingArraysByPathname = (parfumsData) => {
        let data = null;
        if(pathname.startsWith('/originalni-testeri')){
           return data = parfumsData;
        }else if(pathname.startsWith('/muški-testeri')){
            const mens = [];
            parfumsData.forEach(cur => cur.sex === 'men' ? mens.push(cur) : null)
           return data = [...mens];
        }else if( pathname.startsWith('/ženski-testeri')){
            const womens = [];
            parfumsData.forEach(cur => cur.sex === 'women' ? womens.push(cur) : null)
           return data = [...womens];
        }
    }

    let pafums = parfumData;

    // 2 Filtering data
    const setFiltering = (category, option) => {
        let copied = [...filterData]
        if(option === 'muški'){ window.location.href = '/muški-testeri/page=1'; }
        else if(option === 'ženski') { window.location.href = '/ženski-testeri/page=1' ; }

        if(category === 'sort'){ setSort(option) }
        if(category === 'category') { setParfCategory(option) }

        let truth = true;
        filterData.forEach((curFilter, filterIndex) => {
            if(curFilter.option === option){
                truth = false;
            }
        })

        if(truth){
            copied.push({category: category, option: option});
            setFilterData(copied);
        }
    }


    // FILTER BY BRAND
    let mainFilter = [];
    const filterByBrand = (filterData) => {
        if(parfumData){
            parfumData.forEach((parf, parfInd) => {
                filterData.forEach((filtr, filtrInd) => {
                    if(parf.brand === filtr.option){
                        mainFilter.push(parf);
                    }
                })
            })
        }
    }
    
    filterByBrand(filterData);

    // SORT DATA
    let sorted = null;
    if(parfumData){
        const sortData = () => {
            if(mainFilter.length > 0){ sorted = [...mainFilter] }
            else if(parfumData){ sorted = [...parfumData] }
    
            if(sort === 'Najpopularniji'){ sorted.sort((a, b) => a.bought - b.bought).reverse() }
            else if(sort === 'Najbolje ocjenjeni') { sorted.sort((a, b) => a.rated - b.rated).reverse() }
            else if(sort === 'Najskuplji') { sorted.sort((a, b) => +a.price.big.price - +b.price.big.price).reverse() }
            else if(sort === 'Najjeftiniji') { sorted.sort((a, b) => +a.price.medium.price - +b.price.medium.price) }
           
        }

        sortData();
    }

    // Sort by category
    const categorySort = (sorted) => {
        const ml = []
        sorted.forEach(curParf => {
            if(parfCategory === '100ml' && curParf.price.big.price != 0){
                const price = curParf.price.big;
                curParf.categoryPrice = price.discount ? price.discount : price.price
                ml.push(curParf)
            }else if(parfCategory === '55ml' && curParf.price.medium.price != 0){
                const price = curParf.price.medium;
                curParf.categoryPrice = price.discount ? price.discount : price.price
                ml.push(curParf)
            }
        })

        return ml;
    }

    let matrix = [];
    let filteredMatrix = [];
    const matrixForPagionation = (data) => {
        for(let i = 0; i < page * 100; i++){
            const spliced = data.splice(0, 12);
            matrix.push(spliced);
        }
        matrix.forEach(curArr => curArr.length > 0 ? filteredMatrix.push(curArr) : null);
        
        return filteredMatrix;
    }
    
    let paginationTop = null;
    let mainPagination = null;
    if(sorted){
        sorted = categorySort(sorted)   
        sorted = matrixForPagionation([...sorted]);
        sorted = sorted[page - 1]
    

    if(page > 1){
        paginationTop = <Pagination page={page} numOfPages={filteredMatrix.length} changePage={changePage}/>
    }

    mainPagination = sorted.length > 11 ?
     <Pagination page={page} numOfPages={filteredMatrix.length} changePage={changePage}/> : null
}

return <div className="Catalogue">
              <Filter setFiltering={setFiltering} filterData={filterData} sorts={sort} 
              removeFilter={removeFilter} parfumData={parfumData ? parfumData : null} parfCategory={parfCategory} />
              { paginationTop }
              <CataloguePreview page={page} addToLocalStorage={props.addToLocalStorage} route={props.route}
               parfumData={ sorted } parfCategory={parfCategory} updateCart={props.updateCart} />
              { mainPagination }
              <div className="Catalogue-connect">
                   <Connect buttonStyle={() => buttonStyle() } />
                   <Brands />
              </div>
           </div>
}

const mapDispatchToProps = dispatch => ({
    addToLocalStorage: (cartObj) => dispatch(action.itemToLocalStorage(cartObj)),
    updateCart: () => dispatch(action.updateCart())
})

export default connect(null, mapDispatchToProps)(Catalogue)


// 1 - We first recieve data from data base, and sort them by route pathname
// 2 - Filter data with some parameters. If parameters are 'men' or 'women', then redirect. In other case,

const buttonStyle = () => {
  
    return `
  
        // changed
        align-self: center;
        padding: 12px 40px;
        font-size: 16px;
        margin-bottom: 45px;
  
        position: relative;
        background-color: transparent;
        margin-top: 7%;
        color: #9c8265;
        font-family: 'Neutra';
        border: 1px solid #9c8265;
        transition: all .15s ease-in;
  
        &::before {
            position: absolute;
            top: -9%;
            left: 1%;
            display: block;
            content: "";
            border: 1px solid #9c8265;
            height: 114%;
            width: 97%;
        }
  
        &:hover {
            background-color: #e4c7a533;
        }
    `
      }