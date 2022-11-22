# cute-animals
[![npm version](https://img.shields.io/npm/v/cute-animals.svg)](https://npmjs.org/package/cute-animals)

Generates random cute adj-animal combinations that are kid-friendly and not too weird. 

## Install

```sh
npm install --save cute-animals
```

## Usage

### Module

```js
const animal = require('cute-animals')
```

Generate one random animal:

```js
animal()

/*
yak
water boa
ocelot
butterfly
giant panda
*/
```

Generate one random adjective:

```js
animal('adj')

/*
blissful
goofy
sweet
tumbly
pretty
*/
```

Generate two adjectives and an animal:

```js
animal('adj adj animal')

/*
warmhearted tranquil tarantula
yummmy divine mackerel
little exquisite moose
elated tender blue bird
heavenly optimistic starfish
*/
```

### CLI

```sh
$ cute-animals adj adj animal
elated sincere sloth
```

## Corpus

### Adjectives

```
adorable
affectionate
amused
beautiful
befuddled
big
blissful
bouncy
captivating
carefree
caring
charming
cheerful
cheery
chubby
clever
curious
cute
dainty
darling
delighted
divine
dreamy
eager
elated
elegant
exquisite
fanciful
fancy
fantastic
friendly
funny
generous
gentle
giant
giggly
gleeful
goofy
graceful
grateful
happy
heavenly
inspired
jolly
jovial
joyful
jubilant
little
lovable
lovely
loving
nice
optimistic
playful
pleased
plucky
precious
pretty
ridiculous
satisfied
serene
silly
sincere
small
sunny
surprised
sweet
tender
thankful
tipsy
tranquil
tumbly
wacky
warmhearted
whimsical
yummy
zany
```

### Animals

```
aardvark
aardwolf
albatross
alligator
alpaca
anaconda
angelfish
ant
anteater
antelope
antlion
ape
aphid
arctic fox
arctic wolf
armadillo
baboon
badger
bald eagle
bandicoot
barnacle
basilisk
bass
bat
bear
beaver
bee
beetle
bird
bison
blackbird
blue bird
blue jay
blue whale
boa
boar
bobcat
bobolink
bonobo
buffalo
butterfly
camel
canary
capybara
cardinal
caribou
carp
cat
caterpillar
catfish
catshark
cattle
centipede
cephalopod
chameleon
cheetah
chickadee
chicken
chimpanzee
chinchilla
chipmunk
clam
clownfish
cod
condor
cougar
cow
coyote
crab
crane
crawdad
crayfish
cricket
crocodile
crow
cuckoo
deer
dingo
dinosaur
dog
dolphin
donkey
dove
dragon
dragonfly
duck
eagle
earthworm
echidna
eel
egret
elephant seal
elephant
elk
emu
ermine
falcon
ferret
finch
firefly
fish
flamingo
fly
flyingfish
fox
frog
fruit bat
gazelle
gecko
gerbil
gibbon
giraffe
goat
goldfish
goose
gopher
gorilla
grasshopper
great blue heron
guinea pig
guineafowl
gull
guppy
halibut
hamster
hare
hawk
hedgehog
hermit crab
heron
herring
hippopotamus
horse
hummingbird
humpback whale
hyena
iguana
impala
jackal
jaguar
jay
jellyfish
junglefowl
kangaroo mouse
kangaroo rat
kangaroo
kingfisher
kiwi
koala
komodo dragon
ladybug
lark
lemming
lemur
leopard
lion
lizard
llama
lobster
loon
lungfish
lynx
macaw
mackerel
magpie
mammal
manatee
mandrill
manta ray
marlin
marmoset
marmot
mastodon
meadowlark
meerkat
mink
minnow
mockingbird
mole
mollusk
mongoose
monitor lizard
monkey
moose
mosquito
moth
mountain goat
mouse
mule
muskox
narwhal
newt
nightingale
ocelot
octopus
opossum
orangutan
orca
ostrich
otter
owl
ox
panda
panther
parakeet
parrot
parrotfish
partridge
peacock
pelican
penguin
perch
peregrine falcon
pheasant
pig
pigeon
pike
pilot whale
platypus
polar bear
pony
porcupine
porpoise
possum
prairie dog
ptarmigan
puffin
puma
python
quail
rabbit
raccoon
rainbow trout
rattlesnake
raven
red panda
reindeer
reptile
rhinoceros
ringneck dove
roadrunner
robin
rodent
rooster
saber-toothed cat
sailfish
salamander
salmon
sawfish
scallop
scorpion
seahorse
sheep
shrew
shrimp
silkmoth
silkworm
silver fox
silverfish
skink
skunk
sloth
slug
snail
snake
snow leopard
sockeye salmon
sparrow
sperm whale
spider monkey
spider
spoonbill
squid
squirrel
star-nosed mole
starfish
steelhead trout
stingray
stoat
stork
sturgeon
sugar glider
swallow
swan
swift
swordfish
swordtail
tapir
tarantula
tern
thrush
tiger shark
tiger
toad
tortoise
toucan
tree frog
trout
tuna
turkey
turtle
tyrannosaurus
wallaby
walrus
warbler
water boa
water buffalo
weasel
whale
whitefish
whooping crane
wildcat
wildebeest
wolf
wolverine
wombat
woodpecker
worm
wren
x-ray fish
yak
yellow perch
zebra finch
zebra
```

