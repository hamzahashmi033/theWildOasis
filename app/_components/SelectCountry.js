import { getDataCountrys,getRuteCountryImg  } from 'country-state-city-nextjs'
async function SelectCountry({ guest, name, id, className }) {
  const countries = await getDataCountrys();
  

  return (
    <select
      name={name}
      id={id}
      className={className}
      defaultValue={guest.user.nationality}
    >
      <option value=''>Select country...</option>
      {countries.map((c) => (
        <option key={c.id} value={c.text}>
          {c.text}
        </option>
      ))}
    </select>

  );
}

export default SelectCountry;
