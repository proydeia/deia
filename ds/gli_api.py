import pandas as pd
import numpy as np

xls_name = 'ds/lookuptables.xls'
columnsL = ['Age', 'Lspline', 'Mspline', 'Sspline']
columnsV = ['M', 'S', 'L']

fev1male_lookup = pd.read_excel(xls_name, sheet_name=0).iloc[:, 1:5].iloc[:-1, :][1:].reset_index(drop=True)
fev1male_lookup.columns = columnsL
fev1male_msl = pd.read_excel(xls_name, sheet_name=0).iloc[:, 8:15][2:9]
fev1male_msl = fev1male_msl.drop(fev1male_msl.columns[[1, 2, 4, 5]], axis=1)
fev1male_msl.columns = columnsV

fev1female_lookup = pd.read_excel(xls_name, sheet_name=1).iloc[:, 1:5].iloc[:-1, :][1:].reset_index(drop=True)
fev1female_lookup.columns = columnsL
fev1female_msl = pd.read_excel(xls_name, sheet_name=1).iloc[:, 8:15][2:9]
fev1female_msl = fev1female_msl.drop(fev1female_msl.columns[[1, 2, 4, 5]], axis=1)
fev1female_msl.columns = columnsV

fvcmale_lookup = pd.read_excel(xls_name, sheet_name=2).iloc[:, 1:5].iloc[:-1, :][1:].reset_index(drop=True)
fvcmale_lookup.columns = columnsL
fvcmale_msl = pd.read_excel(xls_name, sheet_name=2).iloc[:, 8:15][2:9]
fvcmale_msl = fvcmale_msl.drop(fvcmale_msl.columns[[1, 2, 4, 5]], axis=1)
fvcmale_msl.columns = columnsV

fvcfemale_lookup = pd.read_excel(xls_name, sheet_name=3).iloc[:, 1:5].iloc[:-1, :][1:].reset_index(drop=True)
fvcfemale_lookup.columns = columnsL
fvcfemale_msl = pd.read_excel(xls_name, sheet_name=3).iloc[:, 8:15][2:9]
fvcfemale_msl = fvcfemale_msl.drop(fvcfemale_msl.columns[[1, 2, 4, 5]], axis=1)
fvcfemale_msl.columns = columnsV

fev1fvcmale_lookup = pd.read_excel(xls_name, sheet_name=4).iloc[:, 1:5].iloc[:-1, :][1:].reset_index(drop=True)
fev1fvcmale_lookup.columns = columnsL
fev1fvcfemale_msl = pd.read_excel(xls_name, sheet_name=4).iloc[:, 8:15][2:9]
fev1fvcfemale_msl = fev1fvcfemale_msl.drop(fev1fvcfemale_msl.columns[[1, 2, 4, 5]], axis=1)
fev1fvcfemale_msl.columns = columnsV

fev1fvcfemale_lookup = pd.read_excel(xls_name, sheet_name=5).iloc[:, 1:5].iloc[:-1, :][1:].reset_index(drop=True)
fev1fvcfemale_lookup.columns = columnsL
fev1fvcmale_msl = pd.read_excel(xls_name, sheet_name=5).iloc[:, 8:15][2:9]
fev1fvcmale_msl = fev1fvcmale_msl.drop(fev1fvcmale_msl.columns[[1, 2, 4, 5]], axis=1)
fev1fvcmale_msl.columns = columnsV

def quarter_round(x):
    return round(x*4)/4

def get_match(lookup, age, value):
    filtered_df = lookup[lookup['Age'] == age]

    if filtered_df.empty:
        return None
    
    if value == 'Lspline':
        return filtered_df['Lspline'].values[0]
    elif value == "Mspline":
        return filtered_df['Mspline'].values[0]
    elif value == "Sspline":
        return filtered_df['Sspline'].values[0]
    
    return None

def get_fev1_pred(sex, age, height):
    real_age = quarter_round(age)
    lookup = None
    msl = None
    L = 0
    M = 0
    S = 0
    LLN = 0

    if sex:
        lookup = fev1male_lookup
        msl = fev1male_msl

        L = msl.at[2, 'L'] + (msl.at[4, 'L'] * np.log(age))
    else:
        lookup = fev1female_lookup
        msl = fev1female_msl

        L = msl.at[2, 'L']

    M = np.exp(msl.at[2, 'M'] + (msl.at[3, 'M'] * np.log(height)) + (msl.at[4, 'M'] * np.log(age)) + get_match(lookup, real_age, 'Mspline'))
    S = np.exp(msl.at[2, 'S'] + (msl.at[4, 'S'] * np.log(age)) + get_match(lookup, real_age, 'Sspline'))
    LLN = np.exp((np.log(1 - 1.645 * L * S) / L) + np.log(M))

    res = {
        'L': L,
        'M': M,
        'S': S,
        'LLN': LLN
    }

    return res
    
def get_fvc_pred(sex, age, height):
    real_age = quarter_round(age)
    lookup = None
    msl = None
    L = 0
    M = 0
    S = 0
    LLN = 0

    if sex:
        lookup = fvcmale_lookup
        msl = fvcmale_msl
    else:
        lookup = fvcfemale_lookup
        msl = fvcfemale_msl

    L = msl.at[2, 'L']
    M = np.exp(msl.at[2, 'M'] + (msl.at[3, 'M'] * np.log(height)) + (msl.at[4, 'M'] * np.log(age)) + get_match(lookup, real_age, 'Mspline'))
    S = np.exp(msl.at[2, 'S'] + (msl.at[4, 'S'] * np.log(age)) + get_match(lookup, real_age, 'Sspline'))
    LLN = np.exp((np.log(1 - 1.645 * L * S) / L) + np.log(M))

    res = {
        'L': L,
        'M': M,
        'S': S,
        'LLN': LLN
    }

    return res

def get_fev1_fvc_pred(sex, age, height):
    real_age = quarter_round(age)
    lookup = None
    msl = None
    L = 0
    M = 0
    S = 0
    LLN = 0

    if sex:
        lookup = fev1fvcfemale_lookup
        msl = fev1fvcfemale_msl

        L = msl.at[2, 'L'] + (msl.at[4, 'L'] * np.log(age)) + get_match(lookup, real_age, 'Lspline')
    else:
        lookup = fev1fvcmale_lookup
        msl = fev1fvcmale_msl

        L = msl.at[2, 'L'] + (msl.at[4, 'L'] * np.log(age))

    M = np.exp(msl.at[2, 'M'] + (msl.at[3, 'M'] * np.log(height)) + (msl.at[4, 'M'] * np.log(age)) + get_match(lookup, real_age, 'Mspline'))
    S = np.exp(msl.at[2, 'S'] + (msl.at[4, 'S'] * np.log(age)) + get_match(lookup, real_age, 'Sspline'))
    LLN = np.exp((np.log(1 - (1.645 * L * S)) / L) + np.log(M))

    res = {
        'L': L,
        'M': M,
        'S': S,
        'LLN': LLN
    }

    return res

print(get_fev1_pred(1, 20, 170))
print(get_fvc_pred(1, 20, 170))
print(get_fev1_fvc_pred(1, 20, 170))