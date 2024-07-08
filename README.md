# **React Hook Form**

## Topics Covered

### _Default values_

### _Object and array values_

### _Dynamic fields_

### _Numeric and Date fields_

### _Watch, get and set field values_

### _Touched and dirty states_

### _Handle submission errors_

### _Form submission state_

### _Reset form_

### _Async Validation_

### _Validation modes_

### _Validation modes_

### _Manually trigger validations_

# **Yup Schema Library with RHF**

## Installation

### we need to install yup with @hookfrom/resolver because hook resolver package which **bridges** react hook form with yup.

```
npm install yup @hookform/resolvers
```

### Then need to import

```
import { yupResolver } from "@hookform/resolvers/yup";
import \* as yup from "yup";
```

# **Zod Schema Library with RHF**

## Installation

```
npm install yup @hookform/resolvers
```

### we need to install yup with @hookfrom/resolver because hook resolver package which **bridges** react hook form with yup.

```
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

```
