# halaiks-react-select

Composant React de liste déroulante personnalisée avec navigation au clavier.

## Prérequis

- **Node.js** : version 18 ou supérieure ([télécharger](https://nodejs.org/))
- **npm** : version 9 ou supérieure (installé avec Node)
- **React** : 18 ou 19
- **Éditeur recommandé** : Visual Studio Code

## Installation

```bash
npm install halaiks-react-select
```

## Utilisation

```jsx
import { useState } from "react"
import Select from "halaiks-react-select"
import "halaiks-react-select/style.css"

const departmentOptions = [
  { value: "Sales", label: "Sales" },
  { value: "Engineering", label: "Engineering" },
  { value: "Human Resources", label: "Human Resources" },
]

function CreateEmployee() {
  const [selectedDepartment, setSelectedDepartment] = useState(null)

  return (
    <Select
      label="Department"
      options={departmentOptions}
      value={selectedDepartment}
      onChange={(option) => setSelectedDepartment(option)}
      placeholder="Select a department"
    />
  )
}
```

## Props

| Prop | Type | Description |
|---|---|---|
| `label` | `string` | Label affiché au-dessus du champ |
| `options` | `Array<{ value, label }>` | Liste des options |
| `value` | `{ value, label } \| null` | Option sélectionnée |
| `onChange` | `(option) => void` | Callback de sélection |
| `placeholder` | `string` | Texte par défaut |

## Licence

MIT