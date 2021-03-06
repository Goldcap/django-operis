import re

def firstLower(name):
    return name[:1].lower() + name[1:] if name else ''
    
def clean(name):
    return re.sub('\s', '', name) 

def convert(name):
    name = re.sub('\s', '', name)
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1-\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1-\2', s1).lower()   

def underscore(name):
    name = re.sub('\s', '', name)
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower() 
        
def unconvert(name):
    #splitted_string = name.split('_')
    # use string's class to work on the string to keep its type
    #class_ = name.__class__
    #return class_.join('', map(class_.capitalize, splitted_string))
    name = re.sub('\s', '', name)
    return re.sub("(^|_)([a-zA-Z])", lambda m: m.group(2).capitalize(), name)
     
def convert_friendly(name):
    return re.sub("([a-z])([A-Z])","\g<1> \g<2>",name)
    