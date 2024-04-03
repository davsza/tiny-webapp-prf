const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Termek = mongoose.model('termek');
const passport = require('passport');

async function getUser(req, res, next) {
    try {
      user = await User.findById(req.params.id); //findOne, param
      if (user == null) {
        return res.status(404).json({ message: 'no such user' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  
    res.user = user;
    next();
}

async function getTermek(req, res, next) {
  try {
    termek = await Termek.findById(req.params.id);
    if (termek == null) {
      return res.status(404).json({ message: 'no such product' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.termek = termek;
  next();
}

router.route('/login').post((req, res, next) => {
    if (req.body.username, req.body.password) {
        passport.authenticate('local', function (error, user) {
          console.log("auth");
          console.log(error);
          console.log(user);
          if (error) return res.status(500).send(error);
          req.login(user, function (error) {
            console.log("login");
            if (error) return res.status(500).send(error);
            return res.status(200).send('successful login');
          })
        })(req, res); 
      } else {
        return res.status(400).send('wrong quary, username or password required');
      }
});

router.route('/logout').post((req, res, next) => {
    if(req.isAuthenticated()) {
        req.logout();
        return res.status(200).send('successful loogut');
    } else {
        return res.status(400).send('user was not logged in');
    }
});

router.route('/status').get((req, res, next) => {
    if(req.isAuthenticated()) {
        return res.status(200).send(req.session.passport);
    } else {
        return res.status(403).send('user was not logged in');
    }
});

// GET /users - összes felhasználó lekérdezése
router.get('/', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

// GET /users/termek - összes termek lekérdezése
router.get('/termek', async (req, res) => {
  try {
    const termekek = await Termek.find();
    res.status(200).json(termekek);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /users/:id - egy felhasználó lekérdezése az id alapján
router.get('/:id', getUser, (req, res) => { //ez is egy middleware használati módszer, 
    // a getUser middleware ilyenkor le fog futni a kérés feldolgozása előtt 
    res.json(res.user); //egyszerűsített válaszküldés, a megadott objektumot json-re konvertálva küldjük el
});

// POST /users/register - új felhasználó létrehozása regisztrálással
router.post('/register', async (req, res) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      accessLevel: 1
    });
  
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// POST /users - új felhasználó létrehozása
router.post('/', async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    accessLevel: 1
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST /users/termek - új termek létrehozása
router.post('/termek', async (req, res) => {
  const termek = new Termek({
    name: req.body.name,
    description: req.body.description
  });

  try {
    const newTermek = await termek.save();
    res.status(201).json(newTermek);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH /users/:id - egy felhasználó frissítése az id alapján
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.username != null) {
      res.user.username = req.body.username;
    }
    if (req.body.password != null) {
      res.user.password = req.body.password;
    }
  
    try {
      const updatedUser = await res.user.save();
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// PATCH /users//termek:id - egy termek frissítése az id alapján
router.patch('/termek/:id', getTermek, async (req, res) => {
  if (req.body.name != null) {
    res.termek.name = req.body.name;
  }
  if (req.body.description != null) {
    res.termek.description = req.body.description;
  }

  try {
    const updatedTermek = await res.termek.save();
    res.json(updatedTermek);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
  
// DELETE /users/:id - egy felhasználó törlése az id alapján
router.delete('/:id', getUser, async (req, res) => {
    try {
      await res.user.remove();
      res.json({ message: 'user deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

// DELETE /users/termek/:id - egy termek törlése az id alapján
router.delete('/termek/:id', getTermek, async (req, res) => {
  try {
    await res.termek.remove();
      res.json({ message: 'user deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
  

module.exports = router;