import React, { useState } from 'react';
import {
    Select,
    TextField,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    Typography
} from '@material-ui/core';
import ResultsContainer from './ResultsContainer';
import { makeStyles } from '@material-ui/core/styles';
import { SendSearch } from './Action';
import Scanner from './Scanner';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            width: '100%',
            margin: theme.spacing(0, 2, 2, 0)
        }
    },
    '@media (min-width: 768px)': {
        largeForm: {
            width: 300
        }
    }
}));

const SearchForm = () => {
    const classes = useStyles();

    const [undetectedMessage, setUndetectedMessage] = useState('');
    const [searchType, setSearchType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);

    const [results, setResults] = useState('');

    const handleDetected = result => {
        if (!result) {
            return null;
        }

        if (!result.success) {
            console.log(result);
            setUndetectedMessage(
                'Your volume could not be found via scan. Please try a manual search.'
            );
        } else {
            setSearchType('isbn');
            setSearchTerm(result.codeResult.code);
            console.log(result.codeResult.code);
        }
    };

    const handleChange = event => {
        setSearchType(event.target.value);
    };

    const handleSearch = async event => {
        event.preventDefault();

        setUndetectedMessage('');
        setBooks([]);
        try {
            const response = await SendSearch(searchTerm, searchType);
            console.log(searchTerm, searchType);
            setBooks(response.data.data);
        } catch (error) {
            // @TODO: HANDLE ERROR
            console.log('error', error);
        }
    };

    const handleClear = () => {
        setBooks([]);
        setSearchType('');
        setSearchTerm('');
    };

    return (
        <div>
            <Scanner handleDetected={handleDetected} />
            <form onSubmit={handleSearch}>
                <FormControl
                    fullWidth
                    className={classes.root}
                    variant="outlined"
                    color="secondary"
                    noValidate
                    autoComplete="off"
                    style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <InputLabel id="search-type">Search type</InputLabel>
                    <Select
                        className={classes.largeForm}
                        label="Search type"
                        labelId="search-type"
                        id="search-type"
                        value={searchType}
                        onChange={handleChange}>
                        <MenuItem value="isbn">ISBN</MenuItem>
                        <MenuItem value="author">Author name</MenuItem>
                        <MenuItem value="title">Book title</MenuItem>
                    </Select>

                    {searchType !== '' && (
                        <>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="Search"
                                variant="outlined"
                                color="secondary"
                                onChange={e => setSearchTerm(e.target.value)}
                                value={searchTerm}
                                className={classes.largeForm}
                            />
                            <Button className={classes.largeForm} type="submit">
                                Search
                            </Button>
                        </>
                    )}
                </FormControl>
            </form>

            <Typography variant="body1">{undetectedMessage && undetectedMessage}</Typography>

            {books.length > 0 && (
                <>
                    <Button onClick={handleClear}>Clear Search</Button>
                    <Typography variant="body1">Search results: {books.length}</Typography>
                </>
            )}

            {books.map(book => {
                return <ResultsContainer book={book} key={book.isbn} />;
            })}
        </div>
    );
};

export default SearchForm;
