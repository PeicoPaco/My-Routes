import  usePlacesAutocomplete, { getGeocode, getLatLng} from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from '@reach/combobox';
import "@reach/combobox/styles.css"

import React from 'react'

export default function Places({setOrigin}) {
    const {ready, value, setValue, suggestions: {status, data}, clearSuggestions} = usePlacesAutocomplete()
    const handleSelect = async (val)=> {
        setValue(val, false);
        clearSuggestions()

        const results = await getGeocode({address: val});
        const {lat, lng} = await getLatLng(results[0]);
        setOrigin({lat, lng});
    }
    return (
    <Combobox onSelect={handleSelect}>
        <ComboboxInput 
            value={value}
            onChange = {e => setValue(e.target.value)}
            disabled = {!ready}
            className = "combobox-input"
            placeholder="Origin point here">                
        </ComboboxInput>
        <ComboboxPopover>
            <ComboboxList>
                {status ==="OK" && data.map(({place_id, description}) => 
                    <ComboboxOption  key={place_id} value={description} />
                 )}
            </ComboboxList>
        </ComboboxPopover>
       
    </Combobox>
  )
}
